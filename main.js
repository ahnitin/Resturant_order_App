axios.get("https://crudcrud.com/api/5cb8c6d75a934bdda295dc372bd669e9/AddBill")
.then(res =>{
    for(let i=0;i<res.data.length;i++)
    {
        StoreUserOnScreen(res.data[i]);
    }
})
function resturantwork(event){
    event.preventDefault();
    let Price = document.getElementById("itemPrice").value;
    let Table = document.getElementById("itemTable").value;
    let Menulist = document.getElementById("ChooseItems").value;
    let AddExtra = document.getElementById("addextra").value;

    console.log(Price,Table,Menulist,AddExtra);
    let obj ={
        Price,
        Table,
        Menulist,
        AddExtra
    }
    AddUserToCloud(obj);
    function AddUserToCloud(obj)
    {
        axios.post("https://crudcrud.com/api/5cb8c6d75a934bdda295dc372bd669e9/AddBill",obj)
        .then(res=> StoreUserOnScreen(res.data))
        .catch(err=> console.log(err))
    }
}
function StoreUserOnScreen(obj)
{
    let childEle = document.createElement("li");
    let Parent1 = document.getElementById("table1");
    let Parent2 = document.getElementById("table2");
    let Parent3 = document.getElementById("table3");
    let Parent4 = document.getElementById("table4");
    let Parent5 = document.getElementById("table5");
    childEle.className ="list-group-item list-group-item-action list-group-item-light"; 
    childEle.textContent = obj.Table +"--"+obj.Price+"--"+obj.Menulist+"--"+obj.AddExtra+"--"+obj._id;
    
    const deleteBtm = document.createElement("input");
    deleteBtm.value = "DeleteBill";
    deleteBtm.type = "button";
    deleteBtm.className ="btn btn-outline-danger";
    if(obj.Table == "Table1")
    {
        Parent1.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.Table == "Table2")
    {
        Parent2.append(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.Table == "Table3")
    {
        Parent3.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.Table == "Table4")
    {
        Parent4.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }
    if(obj.Table == "Table5")
    {
        Parent5.appendChild(childEle);
        childEle.appendChild(deleteBtm);
    }

    deleteBtm.onclick =()=>{
        DeleteTheBillAtTable(obj._id,obj.Table)
    };
}
function DeleteTheBillAtTable(userid,tableno)
{
    var ParentEle;
    if(tableno == "Table1")
    {
        ParentEle = document.getElementById("table1")
    }
    if(tableno == "Table2")
    {
        ParentEle = document.getElementById("table2")
    }
    if(tableno == "Table3")
    {
        ParentEle = document.getElementById("table3")
    }
    if(tableno == "Table4")
    {
        ParentEle = document.getElementById("table4")
    }
    if(tableno == "Table5")
    {
        ParentEle = document.getElementById("table5")
    }

    for(let i=0;i<ParentEle.children.length;i++)
    {
        let child = ParentEle.children[i];
        if(child.textContent.includes(userid))
        {
            ParentEle.removeChild(child)
            break;
        }
    }
    axios.delete(`https://crudcrud.com/api/5cb8c6d75a934bdda295dc372bd669e9/AddBill/${userid}`)
    .then(res=>{
        console.log("user Deleted",userId);
    })
    .catch(err=> console.log(err));
}

