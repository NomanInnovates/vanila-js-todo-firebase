
firebase.database().ref('todos').on('child_added',function(data){
     var li=document.createElement('li');
    var liText=document.createTextNode(data.val().value);
    var list=document.getElementById("list");

// DeleteBtn
    var delBtn=document.createElement("button");
    var delText=document.createTextNode("del");
    delBtn.appendChild(delText);
    delBtn.setAttribute("class","deleBtn");
    delBtn.setAttribute("id",data.val().key)
    delBtn.setAttribute("onclick","deletItem(this)")

  
// EditBtn
    var editBtn=document.createElement('button');
    var editText=document.createTextNode('edit');
    editBtn.appendChild(editText);
    editBtn.setAttribute("onclick","editItem(this)");
    
    

    li.appendChild(liText);
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    list.appendChild(li);
    todoItem.value="";
    console.log(li)

})

function AddTodo(){
    var todoItem=document.getElementById("todo_item");
    var database=firebase.database().ref('todos');
    var key=database.push().key;
    var todo={
        value : todoItem.value,
        key: key
    }
    database.child(key).set(todo);
    todoItem.value ="";

    console.log(key);
  }

function editItem(e){
    // var value=e.parentNode.firstChild.nodeValue
    var val=prompt("Enter edit value", e.parentNode.firstChild.nodeValue);
    var editTodo ={
        value: val,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;

    // e.parentNode.firstChild.nodeValue=editValue; 
}

function deletItem(e){
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
    // console.log(e.id)
    }