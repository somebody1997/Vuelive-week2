const Url = 'https://vue3-course-api.hexschool.io';
const path = 'vueliveclass';
const productNum = document.querySelector("#productCount");

const app = {
    data: {
        products: [],
    },
    getData(){
        const url = `${Url}/api/${path}/admin/products`;
        axios.get(url).then(res =>{
            console.log(res);
            if (res.data.success){
                this.data.products = res.data.products;
                this.render();
            }else{
                alert('請重新登入 ');
                window.location = 'login.html';
            }
        }).catch((error) => {
            console.log(error);
        });   
    },
    render() {
      const productList = document.querySelector("#productList");   
      productNum.textContent = this.data.products.length;
      let template ="";
      this.data.products.forEach((item) => {
          template += `
           <tr>
                <td>${item.title}</td>    
                <td class="text-center" width="120">
                    ${parseInt(item.origin_price).toLocaleString()}    
                </td>
                <td class="text-center" width="100">
                    ${parseInt(item.price).toLocaleString()}
                </td>  
                <td class="text-center" width="100">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled? 'checked': ''} data-action="status" data-id="${item.id}">
                        <label class="form-check-label" for="${item.id}">${item.is_enabled? '啟用' : '未啟用'}</label>
                    </div>
                </td>
                <td class="text-center" width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
                </td>
            </tr>
            `;

            productList.innerHTML = template;
            const deleteBtn = document.querySelectorAll('.deleteBtn');
            deleteBtn.forEach(btn =>{
                btn.addEventListener('click',this.deleteProduct.bind(this));
            })
      })
    },
    deleteProduct(e){
        const id = e.target.dataset.id;
        axios.delete(`${Url}/api/${path}/admin/product/${id}`)
        .then(res =>{
          console.log(res);
          app.getData();
        });
        
    },
    init(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    },
    /*enableSate(id){
        this.data.products.forEach((item) => {
            if(id == item.id){
                item.is_enabled = !item.is_enabled;
            }
        })
    }*/
}
app.init();
