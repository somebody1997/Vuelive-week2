const Url = 'https://vue3-course-api.hexschool.io';
const path = 'vueliveclass';
const productNum = document.querySelector("#productCount");

const app = {
    data: {
        product: [],
    },
    getData(){
        const url = `${Url}/api/${path}/admin/products`;
        axios.get(url).then(res =>{
            if (res.data.success){
                this.data.products = res.data.products;
                this.render();
            }else{
                alert('Please Login again ');
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
                <td>${item.item}</td>    
                <td class="text-center" width="120">
                    ${parseInt(item.origin_price).toLocaleString()}    
                </td>
                <td class="text-center" width="100">
                    ${parseInt(item.price).toLocaleString()}
                </td>  
                <td class="text-center" width="100">
                   <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span> 
                </td>
                <td class="text-center" width="120">
                    <button type="button" class=" btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-is="${item.id}">刪除</button>
                </td>
            </tr>
            `;

            productList.innerHTML = template;
            const deleteBtn = document.querySelectorAll('.deleteBtn');
            deleteBtn.forEach(btn =>{
                btn.addEventListener('click,this.deleteProduct');
            })
      })
    },
    deleteProduct(e){
        const id = e.target.dataset.id;
        axios.delete(`${Url}/api/${path}/admin/product/${id}`).then(res =>{
            app.getData();
        });
    },
    init(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    }
}
app.init();
