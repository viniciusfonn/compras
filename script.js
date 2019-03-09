// document.addEventListener("onreadystatechange", function() {
    var listElement = document.querySelector('#app ul');
    var inputElement = document.querySelector('#item');
    var inputElementQtd = document.querySelector('#qtd');
    var inputElementValor = document.querySelector('#valor');

    var buttonElement = document.querySelector('#app button');
    var totalElement = document.querySelector('#total');

    var compras = JSON.parse(localStorage.getItem('lista_compras')) || [];

    function renderCompras(){

        listElement.innerHTML = '';
        totalElement.innerHTML = '';
        var total = 0;

        compras.forEach(item => {
            console.log(item);
            var itemElement = document.createElement('li');
            var itemText = document.createTextNode('Item: ' + item.text + ' ' + ' Quantidade: ' + item.quantidade + 'Valor: ' + item.valor);


            total = parseFloat(item.valor) * parseFloat(item.quantidade) + total;
            totalElement.innerHTML = total;


            var linkElement = document.createElement('a');

            linkElement.setAttribute('href', '#');

            var pos = compras.indexOf(item.text);
            linkElement.setAttribute('onclick', 'deleteItem('+ pos +')');

            var linkText = document.createTextNode('Excluir');

            linkElement.appendChild(linkText);

            itemElement.appendChild(itemText);
            itemElement.appendChild(linkElement);


            listElement.appendChild(itemElement);

        });
    }

    renderCompras();
// }, false);

function addItem(){
    var item = {
        text:'teste',
        quantidade:'',
        valor:0
    };

    item.text = inputElement.value;
    item.quantidade = inputElementQtd.value;
    item.valor = inputElementValor.value;


  

    compras.push(item);
    inputElement.value ='';
    inputElementQtd.value ='';
    inputElementValor.value ='';



    renderCompras();
    saveToStorage();
}

buttonElement.onclick = addItem;


function deleteItem(pos){
    compras.splice(pos,1);
    renderCompras();
    saveToStorage();

}


function saveToStorage(){
    localStorage.setItem('lista_compras',JSON.stringify(compras));
}