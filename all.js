let data = [];

// 連接API
axios.get('https://data.moa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?IsTransData=1&UnitId=037')
.then(function (response) {
    data = response.data;
});

// 渲染網頁
const showList = document.getElementById('showList');
function renderData(data) {
    let str = '';
    data.forEach(function(item){
        let cropName = (item.作物名稱);
        let marketName = (item.市場名稱);
        let topPrice = (item.上價);
        let midPrice = (item.中價);
        let bottomPrice = (item.下價);
        let averagePrice = (item.平均價);
        let tradeVolume = (item.交易量);

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
        `;
        });
        showList.innerHTML = str;
}

// 搜尋功能
let newData = [];

const searchBtn = document.getElementById('search');
let searchInput = document.getElementById('crop');

searchBtn.addEventListener('click', search);
    
searchInput.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') {
        search();
    };
});

function search() {
    const showKeyword = document.getElementById('showKeyword');
    if (searchInput.value !== '') {
        showKeyword.innerHTML = `<p class="keyword">查看「${searchInput.value}」的比價結果</p>`
        newData = data.filter(function (item) {
                return item.作物名稱.includes(searchInput.value);
        });
        if (newData.length == 0) {
            showList.innerHTML = 
            `<tr>
                <td colspan="7" class="text-center p-3">查詢不到當日的交易資訊QQ</td>
            </tr>`
            } 
            else {
                renderData(newData);
            }
        }
        else {
            alert('請輸入作物名稱') // 若查無資料顯示字串
        };
    // 移除filterBtn btnActive
    let filterBtnsAera = document.querySelectorAll('.filterBtn')
    filterBtnsAera.forEach((i)=> {
    i.classList.remove('btnActive');
    })
};




// 篩選種類代碼>> 蔬果:N04、水果:N05、花卉:N06
// 範圍取值
const filterBtns = document.getElementById('filterBtns');
filterBtns.addEventListener('click', function(e) {
    if (e.target.nodeName == 'BUTTON') {
        newData = data.filter(function(i) {
            return i.種類代碼 == e.target.dataset.type;
        });
        renderData(newData);

        // filterBtn btnActive & remove
        let filterBtnsAera = document.querySelectorAll('.filterBtn')
        filterBtnsAera.forEach((i)=> {
            i.classList.remove('btnActive');
        })
        e.target.classList.add('btnActive')
    }
});


// 各欄位箭頭排序
const sortBtn = document.getElementById('tableHead')
sortBtn.addEventListener('click',function (e) {
    const sortPrice = e.target.dataset.price;
    e.preventDefault();
    //console.log(e.target.nodeName);//I
    if (e.target.nodeName !== 'I') {
        return
    }
    else if(e.target.dataset.price){
        if (e.target.dataset.sort == 'up') {
            newData.sort(function (a, b) {
                return a[sortPrice] - b[sortPrice];
            })
        }
        else if (e.target.dataset.sort == 'down') {
            newData.sort(function (a, b) {
                return b[sortPrice] - a[sortPrice];
            })
        }
        renderData(newData);
    }
    // sortBtn active
});


// 下拉選單排序
const select = document.getElementById('js-select');
select.addEventListener('change', function (e) {
    const sortPrice = e.target.value
    if (sortPrice == e.target.value) {
        newData.sort(function (a, b) {
            return b[sortPrice] - a[sortPrice];
        })
    }
    renderData(newData); 
});
// 下拉選單排序(手機版)
const selectMobile = document.getElementById('js-moblie-select');
selectMobile.addEventListener('change', function (e) {
    const sortPrice = e.target.value
    if (sortPrice == e.target.value) {
        newData.sort(function (a, b) {
            return b[sortPrice] - a[sortPrice];
        })
    }
    renderData(newData); 
});


