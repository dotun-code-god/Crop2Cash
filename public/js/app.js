$(function(){

    $("#crops").keydown(function(e){
        if (e.keyCode === 13) {
            e.preventDefault(); 
            $("#add_more_crops").click();
        }
    })
    $("#general_keyword_txt").keydown(function(e){
        if (e.keyCode === 13) {
            e.preventDefault(); 
            $(this).next().click();
        }
    })
    $("#general_keyword_num").keydown(function(e){
        if (e.keyCode === 13) {
            e.preventDefault(); 
            $(this).next().click();
        }
    })
    $("#_age").keydown(function(e){
        if (e.keyCode === 13) {
            e.preventDefault(); 
            $(this).next().click();
        }
    })

    $("#general_keyword_txt").keyup(function(e){
        if ($(this).val()) $(this).next().fadeIn();
        else $(this).next().fadeOut();
    })
    $("#general_keyword_num").keyup(function(e){
        if ($(this).val()) $(this).next().fadeIn();
        else $(this).next().fadeOut();
    })
    $("#_age").keyup(function(e){
        if ($(this).val()) $(this).next().fadeIn();
        else $(this).next().fadeOut();
    })
    $("#age_from").keyup(function(e){
        if ($(this).val()) $(this).next().fadeIn();
        else $(this).next().fadeOut();
    })
    $("#age_to").keyup(function(e){
        if ($(this).val()) $(this).next().fadeIn();
        else $(this).next().fadeOut();
    })

    $.each($(".add_keyword_search"), function(indx, keyword){
        $(this).click(function() {
            let attr = $("#_category").val().replace(' ', '_').toLowerCase();
            if (attr == 'age' && !$(".in_view").val()){
                let val = `Between ${$("#age_from").val()} and ${$("#age_to").val()}`;
                let attr_val = `${$("#age_from").val()}-${$("#age_to").val()}`;
                $("#age_range")[0].checked = false;
                $("#age_from").val('');
                $("#age_to").val('');
                createSearchPreview(val, attr, attr_val)
            }
            else createSearchPreview($(".in_view").val(), attr, $(".in_view").val());
            $("#_age_container").fadeOut();
            if ($("#_category").val().toLowerCase() != 'crops') {
                $(".add_keyword_search").fadeOut();
                $(".in_view").fadeOut().removeClass('.in_view')
            }
            $('.in_view').val('');
        })
    })
    let crops = [];
    $("#add_more_crops").click(function(){
        let cur_val = $("#crops").val();
        if(cur_val){
            crops.push($("#crops").val())
            $("#crops").val('');
            if (!$('#added_crops_container').length)
                $("#add_farmer_input_fields").after('<div id="added_crops_container" class="flex justify-center gap-2 mt-4"></div>');
            let content = $(`<span class='c2c_added_crops'></span>`).text(cur_val);
            $("[name=crops]").val(JSON.stringify(crops));
            $("#added_crops_container").append(content)
        }
    })

    let expectedCategories = ["first name", "last name", "phone number", "age", "address", "crops"];
    
    $("#_category").change(function (e) {
        if(!expectedCategories.includes($(this).val().toLowerCase())) return;
        if(!$("#search_form").length) $("#search").after('<form action="/search" id="search_form" class="hidden"></form>');
        let formattedVal = $(this).val().replace(' ', '_').toLowerCase();
        if($(this).val()) {
            createSearchPreview($(this).val(), 'category', formattedVal);
            $(`[__val=${formattedVal}]`).remove();
        }
        if(formattedVal == "age"){
            if ($(".in_view").length) $(".in_view").hide().removeClass('in_view');
            $("#_age_container").fadeIn();
            $("#_age").addClass('in_view').fadeIn();
        } else {
            $("#_age_container").hide();
            if ($(".in_view").length) $(".in_view").hide().removeClass('in_view');
            if (formattedVal == 'phone_number') $("#general_keyword_num").addClass('in_view').fadeIn();
            else $("#general_keyword_txt").addClass('in_view').fadeIn();
        }
    });
    $("#age_range").click(function(){
        $('.in_view').hide().removeClass('in_view');
        if($(this).is(':checked')) $("#age_range_container").addClass('in_view').fadeIn();
        else $('#_age').addClass('in_view').fadeIn();
    })
    $("#age_from").change(function(){
        $("#age_to").removeAttr('disabled').val($(this).val()).attr('min', $(this).val());
    })

})

function createSearchPreview(val, attr, attr_val){
    val = val.trim(); attr = attr.trim(); attr_val = attr_val.trim();
    if (!$("#final_search_btn").length) {
        $("#search_preview").after(`<button class="c2c_final_search_btn" type="submit" form="search_form" id="final_search_btn" >Search</button>`)
    }
    // create the preview and insert the approp. input into the hidden form
    let content = $(`<span class="c2c_search_preview" id="${attr}-${attr_val}"></span>`)
    .html(`
        <span class="cursor-pointer">${attr =='category' ? val : '"' + val + '"'}</span>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="c2c_search_preview_cancel" onclick='removeAddedSearch("${attr}", "${attr_val}", "${val}")'>
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    `)
    $("#search_preview").append(content);
    $("#search_form").append(`<input name='${attr}-${attr_val}' value='${attr_val}' />`);
}

function removeAddedSearch(attr, attr_val, val){
    if ($(".c2c_search_preview").length == 1) {
        $("#final_search_btn").remove();
    }; // remove the search btn if no more previews
    $(`[name=${attr}-${attr_val}]`).remove() // remove from form
    $(`#${attr}-${attr_val}`).remove(); // remove from search preview
    if(attr == 'category') {
        $("#categories").append(`<option value="${val}" __val="${attr_val}">`);
        $("#_category").val('');
        $(".in_view").hide().removeClass('in_view');
    } // add back to category list if it is a category
    else {
        if(attr == 'age' && !$('.in_view').val()){
            $("#age_range")[0].checked = false;
            $("#age_from").val('');
            $("#age_to").val('');
        }
    }
    $(".in_view").val('');
    $(".add_keyword_search").hide();
    $("#_age_container").hide();
}