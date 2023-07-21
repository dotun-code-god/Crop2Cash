const {con, query} = require('./connect');

class Farmer {

    static async save(data) {
        let sql = `INSERT INTO farmers (${Object.getOwnPropertyNames(data).join(", ")}) VALUES (`;
        let i = 0;
        let values = Object.values(data);
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                sql += "? ";
                if (i < values.length - 1) {
                    sql += ", ";
                }
                i++;
            }
        }
        sql += ")";
        let result = await query(sql, values);
        return result.insertId ? this.retrieveAllFarmers() : false;
    }

    static async retrieveAllFarmers(){
        let farmers = await query("SELECT * FROM farmers ORDER BY id DESC");
        farmers.forEach(farmer => {
            farmer.crops = JSON.parse(farmer.crops).join(', ')
        });
        return farmers;
    }

    static async findFarmerById(id) {
        let rows = await query(`SELECT * FROM farmers WHERE id = ${id}`)
        if(rows.length > 0){
            return rows[0];
        }
        return false;
    }

    static async retrieveFarmers(data){
        let attributes = data.attr && data.attr.join(', ');
        let condition = [];
        delete data.attr;
        for(const key in data){
            if(key == 'address'){
                condition.push(`${key} LIKE '%${data[key]}%'`)
            } else if(key == 'age' && data[key].indexOf('-')){
                let left = data[key].split('-')[0];
                let right = data[key].split('-')[1];
                condition.push(`${key} BETWEEN ${left} AND ${right}`)
            } else if(key == 'crops'){
                if(data[key].length > 1){
                    let crops_condition = [];
                    for(let i = 0; i < data[key].length; i++){
                        crops_condition.push(`${key} LIKE '%${data[key][i]}%'`)
                    }
                    condition.push(crops_condition.join(' OR '));
                } else {
                    condition.push(`${key} LIKE '%${data[key][0]}%'`)
                }   
            } else {
                condition.push(`${key} = '${data[key]}'`)
            }
        }
        condition = condition.length ? 'WHERE ' + condition.join(' AND ') : ''
        let farmers = await query(`SELECT ${attributes} from farmers ${condition}`);
        farmers.forEach(farmer => {
            if(farmer.crops){
                farmer.crops = JSON.parse(farmer.crops).join(', ')
            }
        });
        return farmers;
    }
    
}

module.exports = Farmer;