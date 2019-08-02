ViewData = {
    BillsCounter :               [0,0,0,0,0,0,0,0,0,0],      // Limited to 10 bills
    BillsTotal   :               0,
    BillValue    :               null,
}

App = {
    Unit         :               'AKZ',    
    Format       :               '*<SPAN class="main_unit">AKZ</SPAN>',
    DecimalsUnit :               2,    
    Bills        :               [500, 1000, 2000, 5000],
}

var total = 0;
var Time = 0;
var values = [500, 5000, 1000, 2000, 500, 500, 1000, 2000, 500, 1000, 2000, 500, 500, 500];

function PayCashIn_Cash(value, total) {
    setTimeout(function(){
        for (var i = 0 ; i <= Len(values) ; i++) {
            if (value == App.Bills[i]) {
                var show;
                show = App.Bills[i];
                ViewData.BillsCounter[i]++;
                ViewData.BillsTotal[i] += value;
                PayCashIn_Cash_Show(value);
                SetText(J('.obj_bills_total_amount'), total);
            }
        }
    }, 3000 + Time);    
    Time += 3000;
}

function PayCashIn_Cash_Show(value) {
    var box = "";       
    for (var i = 0 ; i < Len(App.Bills)  ; i++) {
        
        // OPCIONAL opacity on bills on counter 0 
        // OPCIONAL opacity 0.1 a 0.9
        
        var html = "";
        var billsUnder = "";
        var billCss = "";
        var bill = App.Bills[i];
        var counter = ViewData.BillsCounter[i];
        var limit = (counter >= 6) ? 6 : counter;

        // bill base
        billsUnder = HtmlCss('', 'obj_bill_base');

        // under
        for (var j = 1; j < limit; j++) 
        {
            billsUnder += HtmlCss('', 'obj_bill_under type_' + j);
        }
        
        // last or other bill
        billCss = (value == bill) ? 'type_last' : 'type_other';

        // html div elements
        html = HtmlDiv(
        HtmlCss(counter, 'obj_bill_counter') +
        HtmlCss(FormatAmount(bill), 'obj_bill_value') + 
        HtmlCss(FormatAmount(counter * bill) , 'obj_bill_total') +                      
        billsUnder +
        HtmlCss('', 'obj_bill_bill') 
        , 'obj_bill type_' + bill + ' type_limit_' + limit + ' ' +  billCss); // NOTA: Limite de 10 notas sobrepostas
        box += html;
    }
    box = HtmlDiv(box, "obj_bills");
    SetHtml('.stepPayCash_html', box);
}

function simulate() {
    for (var i = 0; i < Len(values); i++) {
        var value = values[i];
        total += value;
        PayCashIn_Cash(value, total);
    }
}

$(document).ready(simulate());
