$(function() {
        var sheetUrl = 'https://spreadsheets.google.com/feeds/list/1IOCHQu-gHoDctHqFTMVjat7UlaJ7LXuV6vCJuNdoBnY/' + sheetnum + '/public/full?alt=json';
        $.getJSON(sheetUrl, function(data) {
          entry = data.feed.entry;
          console.log(entry);
          var id;
          var table;
          
          entry.forEach(function(item, index) {

            if (item.gsx$id.$t) {
              //console.log(item.gsx$id.$t)
              id = document.getElementById(item.gsx$id.$t);
              table = document.createElement("TABLE");
              table.className = "listing";
            } else {
              try {
              	//document.getElementById("updatedate").innerText = entry[0].gsx$text.$t
                var row = table.insertRow();
                var cell0 = row.insertCell(0)

              //  var txt = item.gsx$text.$t.toLowerCase().replace(/ /g, '');
                if (!item.gsx$amount.$t) {
                  //console.log(txt);
                  id.innerHTML = item.gsx$text.$t;
                  //cell0.className = "soldout";
                  //id.appendChild(table);
                } else {
                  cell0.className = "cell0";

                  var cell1 = row.insertCell(1)


                  cell0.innerHTML = item.gsx$text.$t;
                  if (item.gsx$seemorelink.$t) {
                    var a = document.createElement("A")
                    a.href = item.gsx$seemorelink.$t
                    a.innerHTML = "See images"
                    cell0.append(" ");
                    cell0.append(a);
                  }

                  var form = document.createElement("FORM");

                  if (isNaN(item.gsx$amount.$t) == true) {
                    form.innerHTML = item.gsx$amount.$t;
                  } else {
                    cell0.innerHTML += ' <b>$' + item.gsx$amount.$t + '</b>';

                    form.action = "https://www.paypal.com/cgi-bin/webscr";
                    form.method = "post";
                    form.target = "paypal";

                    var alt = document.createElement("INPUT");
                    alt.type = "image";
                    alt.src = "https://www.paypal.com/en_US/i/btn/x-click-but22.gif";
                    alt.alt = "Make payments with PayPal - it is fast, free and secure!";
                    alt.name = "I8";
                    form.appendChild(alt);

                    var add = document.createElement("INPUT");
                    add.name = "add";
                    add.type = "hidden";
                    add.value = "1";
                    form.appendChild(add);

                    var cmd = document.createElement("INPUT");
                    cmd.name = "cmd";
                    cmd.type = "hidden";
                    cmd.value = "_cart";
                    form.appendChild(cmd);

                    var business = document.createElement("INPUT");
                    business.name = "business";
                    business.type = "hidden";
                    business.value = "precisionclassic@schweissguth.com";
                    form.appendChild(business);


                    var itemname = document.createElement("INPUT");
                    itemname.name = "item_name";
                    itemname.type = "hidden";
                    itemname.value = item.gsx$itemname.$t;
                    form.appendChild(itemname);

                    var itemnumber = document.createElement("INPUT");
                    itemnumber.name = "item_number";
                    itemnumber.type = "hidden";
                    itemnumber.value = item.gsx$itemnumber.$t;
                    form.appendChild(itemnumber);

                    var amount = document.createElement("INPUT");
                    amount.name = "amount";
                    amount.type = "hidden";
                    amount.value = item.gsx$amount.$t;
                    form.appendChild(amount);

                    var nonote = document.createElement("INPUT");
                    nonote.name = "no_note";
                    nonote.type = "hidden";
                    nonote.value = "1";
                    form.appendChild(nonote);

                    var currencycode = document.createElement("INPUT");
                    currencycode.name = "currency_code";
                    currencycode.type = "hidden";
                    currencycode.value = "USD";
                    form.appendChild(currencycode);

                    var lc = document.createElement("INPUT");
                    lc.name = "lc";
                    lc.type = "hidden";
                    lc.value = "US";
                    form.appendChild(lc);

                    var weight = document.createElement("INPUT");
                    weight.name = "weight";
                    weight.type = "hidden";
                    weight.value = item.gsx$weight.$t;
                    form.appendChild(weight);

                    var weightunit = document.createElement("INPUT");
                    weightunit.name = "weight_unit";
                    weightunit.type = "hidden";
                    weightunit.value = "lbs";
                    form.appendChild(weightunit);


                  }



                  cell1.appendChild(form);
                  cell1.className = "cell1";


                  id.appendChild(table);
                  //id.appendChild(document.createElement("BR"));


                }
              } catch (err) {} finally {
                //   console.log(table)
              }
            }

          });
        });
      });