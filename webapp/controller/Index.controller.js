sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";
        var urlObject = library.URLHelper;
        return Controller.extend("consultaprodutos.controller.Index", {
            onInit: function () {

                let product = {};
                let productModel = new JSONModel(product);
                let view = this.getView(); // o 'This.' no js é equivalente ao 'me->' no ABAP
                view.setModel(productModel, "ProductModel");

            },
            onPressBuscar: function(){
                let input;
                input = this.byId("inpbusca");
                let valor =  input.getValue();

                //alert(valor);

                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method : "GET",
                    async : true,
                    crossDomain : true
                };
                //promise = Quando uma função retorna como parametro de exportação outra função
                $.ajax(parameters).done(function(response){
                    let oDatasModel = this.getView().getModel("ProductModel");
                    //Clear
                    oDatasModel.setData({});
                    oDatasModel.refresh();
                    oDatasModel.setData(response);
                    oDatasModel.refresh();

                }.bind(this) ).fail(function(){

                }.bind(this));

                //variavel tipo texto - com aspas
                let material = "Agua" ;
                //variavel tipo numerico inteiro
                let numb = 123;
                //variavel tipo numerico com decimais
                let numbdecimals = 12.3;
                //variavel booleana
                let boolvariavel = true;
                //Array equivalente a uma tabela interna no SAP
                let composicao = ["bicarbonato","Acido Sulfurico","Galium"]
                //Estrutura - tipo com varias propiedades - ou tambem chamdo de objeto
                let produto = {
                descricao : "chá verde",
                marca : "quaker",
                peso : 130,
                uom : "g",
                }
            },
            onClickImage: function(oEvent){
                urlObject.redirect(oEvent.getSource().getSrc(), true)
            },
            
        });
    });
