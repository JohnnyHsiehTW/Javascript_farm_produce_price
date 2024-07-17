// 連接API V



axios.get('https://data.moa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?IsTransData=1&UnitId=037')
    .then(function (response) {
    //顯示所有資料 V
    // 資料載入中...
    
    let data = response.data;
    const showList = document.getElementById('showList');    
    const searchBtn = document.getElementById('search');

    searchBtn.addEventListener('click', KeywordSearch())

    function KeywordSearch() {
        let searchInput = document.getElementById('crop').value;
        data.forEach(function(){
            let str = '';
            data.filter(function(item){
                let cropName = (item.作物名稱);
                let marketName = (item.市場名稱);
                let topPrice = (item.上價);
                let midPrice = (item.中價);
                let bottomPrice = (item.下價);
                let averagePrice = (item.平均價);
                let tradeVolume = (item.交易量);
                if (searchInput == '') {
                    return
                }                
                else if (cropName.includes(searchInput)) {
                    str += `
                        <tr>
                            <th>${cropName}</th>
                            <td>${marketName}</td>
                            <td>${topPrice}</td>
                            <td>${midPrice}</td>
                            <td>${bottomPrice}</td>
                            <td>${averagePrice}</td>
                            <td>${tradeVolume}</td>
                        </tr>
                    `
                }
            });
            showList.innerHTML = str;
        })
    }

    // 篩選種類代碼>> 蔬果:N04、水果:N05、花卉:N06
    const vegetablesBtn = document.getElementById('vegetablesBtn');
    const fruitsBtn = document.getElementById('fruitsBtn');
    const flowersBtn = document.getElementById('flowersBtn');

    vegetablesBtn.addEventListener('click', function (e) {
        let vegeData = data.filter(function(i) {
            return i.種類代碼 == e.target.dataset.type;
        });
        btnFilter(vegeData);
    })

    function btnFilter(newData) {
        let newStr ='';
        newData.forEach(function(item) {
            let cropName = (item.作物名稱);
            let marketName = (item.市場名稱);
            let topPrice = (item.上價);
            let midPrice = (item.中價);
            let bottomPrice = (item.下價);
            let averagePrice = (item.平均價);
            let tradeVolume = (item.交易量);

            newStr += `
                <tr>
                    <th>${cropName}</th>
                    <td>${marketName}</td>
                    <td>${topPrice}</td>
                    <td>${midPrice}</td>
                    <td>${bottomPrice}</td>
                    <td>${averagePrice}</td>
                    <td>${tradeVolume}</td>
                </tr>
            `
        });
        showList.innerHTML = newStr;
    }
})


// 搜尋，查看「搜尋欄input」的比價結果


// 若查無資料顯示字串
// 下拉選單排序
// 各欄位排序


