
function ProvinceCity(dealerprovince, dealercity, dealer, data) {
    dealerprovince.empty();
    dealercity.empty();
    dealer.empty();

    dealerprovince.append("<option value='0'>请选择</option>");
    dealercity.append("<option value='0'>请选择</option>");
    dealer.append("<option value='0'>请选择</option>");

    var dealercity_arr = new Array();
    var dealer_arr = new Array();
    var temp_arr = {};
    var temp = null;

    for (var i = 0; i < data.length; i++) {
        dealerprovince.append("<option value='" + data[i].Code + "'>" + data[i].Name + "</option>");
        if (data[i].City.length != 0) {
            for (var j = 0; j < data[i].City.length; j++) {
                //City
                temp_arr['Index'] = i + 1;
                temp_arr['Code'] = data[i].City[j].Code;
                temp_arr['Name'] = data[i].City[j].Name;

                temp = { 'Index': temp_arr['Index'], 'Code': temp_arr['Code'], 'Name': temp_arr['Name'] };
                dealercity_arr.push(temp);
                if (data[i].City[j].Dealer.length != 0) {
                    //Dealer
                    for (var k = 0; k < data[i].City[j].Dealer.length ; k++) {
                        temp_arr['ProIndex'] = i + 1;
                        temp_arr['CityIndex'] = j + 1;
                        temp_arr['Code'] = data[i].City[j].Dealer[k].Code;
                        temp_arr['Name'] = data[i].City[j].Dealer[k].Name;
                        temp = { 'ProIndex': temp_arr['ProIndex'], 'CityIndex': temp_arr['CityIndex'], 'Code': temp_arr['Code'], 'Name': temp_arr['Name'] };
                        dealer_arr.push(temp);
                    }
                }
            }
        }
    }
    //省
    dealerprovince.change(function () {
        dealercity[0].options.length = 0;
        dealer[0].options.length = 0;
        dealercity.append("<option value='0'>请选择</option>");
        dealer.append("<option value='0'>请选择</option>");
        for (var i = 0; i < dealercity_arr.length; i++) {
            if (dealercity_arr[i].Index == dealerprovince[0].selectedIndex)
                dealercity.append("<option value='" + dealercity_arr[i].Code + "'>" + dealercity_arr[i].Name + "</option>");
        }
    })
    //市
    dealercity.change(function () {
        dealer[0].options.length = 0;
        dealer.append("<option value='0'>请选择</option>");
        for (var i = 0; i < dealer_arr.length; i++) {
            if (dealer_arr[i].ProIndex == dealerprovince[0].selectedIndex && dealer_arr[i].CityIndex == dealercity[0].selectedIndex)
                dealer.append("<option value='" + dealer_arr[i].Code + "'>" + dealer_arr[i].Name + "</option>");
        }
    })

};