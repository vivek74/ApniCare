$(document).ready(function() {
    var max_fields      = 100; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            var y = x-1;
            
            $(wrapper).append('<div class="input-field col s6"><input class="salt" id="salt'+y+'" name="drugs['+y+'][salt]" type="text"><label for="salt'+y+'">Salt/Drugs</label></div><div class="input-field col s6"><input class="strength" id="strength'+y+'" name="drugs['+y+'][strength]" type="text"><label for="strength'+y+'">Strength</label></div>');
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});

//enter item page 
$(document).ready(function() {
    var max_fields      = 100; //maximum input boxes allowed
    var wrapper         = $(".item_add"); //Fields wrapper
    var add_button      = $(".add_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            var y = x-1;
            // var z = add ;
            //$(wrapper).append('<div class="row"><div class="input-field col s4"><input required id="unitQty'+y+'" class="unitQty" name="quantity['+y+'][unitQty]" type="Number" ><label for="unitQty'+y+'">Unit Quantity</label></div><div class="input-field col s4"><input required id="firstPackaging'+y+'" class="unitQty" name="quantity['+y+'][packagingUnit1]" type="text" ><label for="firstPackaging'+y+'">Packaging unit 1</label></div><div class="input-field col s4"><input required id="secondPackaging'+y+'" name="quantity['+y+'][packagingUnit2]" type="text" ><label for="secondPackaging'+y+'">Packaging unit 2</label></div></div><div class="row"><div class="input-field col s4"><input required id="mrp'+y+'"name="quantity['+y+'][mrp]" type="Number" class="mrp"><label for="mrp'+y+'">MRP</label></div><div class="input-field col s4"><input required id="discount'+y+'" class="discount" name="quantity['+y+'][discount]" type="Number"><label for="discount'+y+'">Discount</label></div> <div class="input-field col s4"><input id="rate'+y+'" name="rate" type="Number" class="rate"></div></div>');
            $(wrapper).append('<div class="row"><div class="input-field col s4"><input onkeyup="add_item'+y+'()" required id="unitQty'+y+'" class="unitQty" name="quantity['+y+'][unitQty]" type="Number" ><label for="unitQty'+y+'">Unit Quantity</label></div><div class="input-field col s4"><input required id="firstPackaging'+y+'" class="unitQty" name="quantity['+y+'][packagingUnit1]" type="text" ><label for="firstPackaging'+y+'">Packaging unit 1</label></div><div class="input-field col s4"><input required id="secondPackaging'+y+'" name="quantity['+y+'][packagingUnit2]" type="text" ><label for="secondPackaging'+y+'">Packaging unit 2</label></div></div><div class="row"><div class="input-field col s3"><input onkeyup="add_item'+y+'()" required id="mrp'+y+'"name="quantity['+y+'][mrp]" type="Number" class="mrp"><label for="mrp'+y+'">MRP</label></div><div class="input-field col s3"><input required id="discount'+y+'" class="discount" name="quantity['+y+'][discount]" type="Number"><label for="discount'+y+'">Discount</label></div></div>');
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});

//medicine available

$(document).ready(function() {
    var max_fields      = 100; //maximum input boxes allowed
    var wrapper         = $(".item_medicine_text"); //Fields wrapper
    var add_button      = $(".add_medicine_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            var y = x-1;
            $(wrapper).append('<div class="row"><div class="input-field"><input name="medicineAvailable['+y+'][company]" type="text" id="company'+y+'" required><label for="company'+y+'">Company name</label></div><div class="input-field"><input name="medicineAvailable['+y+'][medicine]" type="text" id="medicine'+y+'" required><label for="medicine'+y+'">Medicine name</label></div></div>');
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});

//faqs
$(document).ready(function() {
    var max_fields      = 100; //maximum input boxes allowed
    var wrapper         = $(".item_faq_text"); //Fields wrapper
    var add_button      = $(".add_faq_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            var y = x-1;
            $(wrapper).append('<div class="question"><input name="faq['+y+'][question]" type="text" class="question" required><label for="question">Question</label></div><div class="answer"><input name="faq['+y+'][answer]" type="text" class="answer" required><label for="answer">Answer</label></div>');
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});

//add medicine field prescription
$(document).ready(function() {
    var max_fields      = 100; //maximum input boxes allowed
    var wrapper         = $(".med_add"); //Fields wrapper
    var add_button      = $(".add_med_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            var y = x-1;
            $(wrapper).append('<div class="row"><div class="input-field col s8"><input name="medicines['+y+'][text]" id="medicine" type="text" class="validate"><label for="medicine">Medicine name</label></div></div>');
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});

//coupon code update status on check box click
$('#cpd').on('click', function(){
    console.log("clicked");
});

//to disapper error div
setTimeout(function() {
    $("#mydiv").fadeOut().empty();
}, 2000);

//searching in user for number
var showResults = debounce(function(arg){
    var value = arg.trim();
    if(value == "" || value.length <=0 ) {
        $("#search-results-item").fadeOut();
        return;
    } else {
        $("#search-results-item").fadeIn();
    };
    
    var jqxhr = $.get('/users/search/user?search=' + value, function(data){
        $("#search-results-item").html("");
    })
    .done(function(data){
        if(data.length === 0){
            $("#search-results-item").append('<li style="background:white; width: 530;"><a style="color:black"> No result </a></li>');
        } else {
            data.forEach(x => {
                $("#search-results-item").append('<li style="background:white; width: 530;"><a href="/users/searchResult/' + x.phone + '" style="color:black">' + x.name + '<span style="padding-left:30px;">'+ x.phone +'</span><span style="padding-left:30px;">'+ x.atulyaCard +'</span></a></li>')
            });
        }
    })
    .fail(function(err){
        console.log(err);
    })
}, 200);

function debounce(func, wait, immediate){
    var timeout;
    return function (){
        var context = this,
        args = arguments;
        var later = function(){
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//searching in medicine.....

var showResultsItem = debounce1(function(arg){
    var value = arg.trim();
    if(value == "" || value.length <=0 ) {
        $("#search-results").fadeOut();
        return;
    } else {
        $("#search-results").fadeIn();
    };
    var jqxhr = $.get('/item/search/item?search=' + value, function(data){
        $("#search-results").html("");
    })
    .done(function(data){
        if(data.length === 0){
            $("#search-results").append('<li style="background:white; width: 530;"><a style="color:black"> No result </a></li>');
        } else {
            data.forEach(x => {
                $("#search-results").append('<li style="background:white; width: 530;text-transform: uppercase;"><a href="/item/item-search/' + x.medicineId +'" style="color:black">' + x.medicineName + '<span style="color:greay; padding-left: 6em;color: darkgrey;font-size: small;">' + x.medicineId +'<span></a></li>')
            });
        }
    })
    .fail(function(err){
        console.log(err);
    })
}, 200);

function debounce1(func, wait, immediate){
    var timeout;
    return function (){
        var context = this,
        args = arguments;
        var later = function(){
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//searching in supplier

var showResultsVendor = debounce2(function(arg){
    var value = arg.trim();
    if(value == "" || value.length <=0 ) {
        $("#search-results").fadeOut();
        return;
    } else {
        $("#search-results").fadeIn();
    };
    var jqxhr = $.get('/supplier/search/vendor?search=' + value, function(data){
        $("#search-results").html("");
    })
    .done(function(data){
        if(data.length === 0){
            $("#search-results").append('<li style="background:white; width: 530;"><a style="color:black"> No result </a></li>');
        } else {
            data.forEach(x => {
                $("#search-results").append('<li style="background:white; width: 530;text-transform: uppercase;"><a href="/supplier/'+ x.supplierId +'/add_medicine " style="color:black">' + x.supplierName + '<span></a></li>')
            });
        }
    })
    .fail(function(err){
        console.log(err);
    })
}, 200);

function debounce2(func, wait, immediate){
    var timeout;
    return function (){
        var context = this,
        args = arguments;
        var later = function(){
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//searching in coupon

var showResultsCoupon = debounce3(function(arg){
    var value = arg.trim();
    if(value == "" || value.length <=0 ) {
        $("#search-results").fadeOut();
        return;
    } else {
        $("#search-results").fadeIn();
    };
    var jqxhr = $.get('/coupon-code/search/coupon?search=' + value, function(data){
        $("#search-results").html("");
    })
    .done(function(data){
        if(data.length === 0){
            $("#search-results").append('<li style="background:white; width: 530;"><a style="color:black"> No result </a></li>');
        } else {
            data.forEach(x => {
                $("#search-results").append('<li style="background:white; width: 530;text-transform: uppercase;"><a href="/coupon-code/search-coupon/search/'+ x.couponCodeId +'" style="color:black">' + x.couponCodeName + '<span></a></li>')
            });
        }
    })
    .fail(function(err){
        console.log(err);
    })
}, 200);

function debounce3(func, wait, immediate){
    var timeout;
    return function (){
        var context = this,
        args = arguments;
        var later = function(){
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//calculating numbers
function med(){
    $('input').keyup(function(){ // run anytime the value changes
        var firstValue  = Number($('#unitQty').val());   // get value of field
        var secondValue = Number($('#mrp').val()); // convert it to a float
        var result = Math.round(secondValue / firstValue);
        document.getElementById('rate').value = result;
    });
}

function item(){
    $('input').keyup(function(){ // run anytime the value changes
        var firstValue  = Number($('#unitQty0').val());   // get value of field
        var secondValue = Number($('#mrp0').val()); // convert it to a float
        var result = Math.round(secondValue / firstValue);
        document.getElementById('rate0').value = result;
    });
}


//calc in medicine

