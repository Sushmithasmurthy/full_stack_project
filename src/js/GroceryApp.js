import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.css';
import '../css/grocery.css';

var Fawe = require('react-fontawesome');

const AddItem = (props)=>{
    return(
        <div className="col-2">
            <button type="button" className="btn btn-primary btn-block" onClick={props.addItemToList}>
                <i className="fa fa-plus"></i>
            </button>
        </div>


    );
};

const Item = (props)=>{
    return(
      <div className="container center-block col-12">
        <div className="row">
        <div className="col-7">
           <input type="text" className="form-control input-sm" id="currentItemName" placeholder="Item Name"
           onBlur={props.setCurrentItemName}></input>
        </div>
        <div className="col-3">
            <input type="text" className="form-control input-sm" id="currentItemQty" placeholder="0"
            onBlur={props.setCurrentItemQty}></input>
        </div>
        <AddItem addItemToList={props.addItemToList}/>
      </div>
       </div>
    );
};

const ItemList = (props)=>{
    return(
        <div className="container center-block col-12">
              <table className="col-8 table table-striped table-hover table-bordered">
                <thead><tr><th >Item Id</th><th >Item Name</th><th>Qty</th><th>Delete</th></tr></thead>
                <tbody>
                {props.items.map( (item,i) =>
                  <tr id={item.id} key={item.id}>
                    <td id={"row_"+i+"_key"} >{item.id}</td>
                    <td id={"row_" +i+"_itemName"}>{item.itemName}</td>
                    <td id={"row_" +i+"_itemQty"}>{item.qty}</td>
                    <td id={"row_" +i+"_deleteBtn"}>
                        <button type="button" className="btn btn-danger"
                        onClick={() => props.removeItemFromList(item.id)}>
                         <i className="fa fa-trash" aria-hidden="true"></i>
                    </button></td>
                  </tr>
                )}
                </tbody>
            </table>
         </div>
    )
};

class GroceryApp extends React.Component{
    state = {
        items: [

        ],
        currentItemName: null,
        currentItemQty:  null

    };


    static getTarget = (e) =>{
        if(!e){
            e = window.event;
        }
        return e.target || e.srcElement;
    }

    setCurrentItemName = ()=>{
        var ele = document.getElementById("currentItemName");
        this.setState(()=>({
            currentItemName:ele.value
        })
        );
    }

    setCurrentItemQty = () =>{
         var ele = document.getElementById("currentItemQty")
         this.setState(() => ({
            currentItemQty:ele.value
         }));
    }

    removeItemFromList = ( selectedItemId) =>{
         this.setState((prevState)=>{
                        return{
                             items: prevState.items.filter(function(item){
                                return item.id !== selectedItemId;
                             })
                        };
                    });
    }

    addItemToList = (e) =>{

        this.setState((prevState) => {
            prevState.items.push({id: Date.now(), itemName:prevState.currentItemName, qty:prevState.currentItemQty});
            return { items: prevState.items};
        });
    }

    render(){
        return(
            <div name="container center-block">
                <h5>Grocery List
                            <Fawe name='apple'  />
                                <Fawe name='coffee' />
                                <Fawe name='home' />
                </h5>
                <Item setCurrentItemName={this.setCurrentItemName} setCurrentItemQty={this.setCurrentItemQty}
                                       addItemToList={this.addItemToList} />
                <hr />
                <ItemList items={this.state.items} removeItemFromList={this.removeItemFromList}/>
            </div>
        );
    }
}

export default GroceryApp;
