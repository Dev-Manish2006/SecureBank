import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import "../styles/admin.css";



function Admin(){


const navigate = useNavigate();



const [users,setUsers]=useState([]);

const [accounts,setAccounts]=useState([]);

const [transactions,setTransactions]=useState([]);



const [stats,setStats]=useState({

    users:0,

    accounts:0,

    transactions:0

});







useEffect(()=>{


const token = localStorage.getItem("token");


if(!token){

    navigate("/login");

    return;

}



loadUsers();

loadStats();

loadAccounts();

loadTransactions();



},[]);







const headers = {

    Authorization:
    `Bearer ${localStorage.getItem("token")}`

};








// USERS

const loadUsers = async()=>{


try{


const res = await API.get(

"/admin/users",

{

headers

}

);


setUsers(res.data.users);



}

catch(error){

alert(
error.response?.data?.message
);

}



};








// STATS

const loadStats = async()=>{


try{


const res = await API.get(

"/admin/stats",

{

headers

}

);


setStats(res.data);



}

catch(error){

alert(
error.response?.data?.message
);

}



};









// ACCOUNTS

const loadAccounts = async()=>{


try{


const res = await API.get(

"/admin/accounts",

{

headers

}

);



setAccounts(res.data.accounts);



}

catch(error){

alert(
error.response?.data?.message
);

}



};









// TRANSACTIONS


const loadTransactions = async()=>{


try{


const res = await API.get(

"/admin/transactions",

{

headers

}

);



setTransactions(
res.data.transactions
);



}

catch(error){

alert(
error.response?.data?.message
);

}



};









// BLOCK USER

const blockUser = async(id)=>{


try{


await API.put(

`/admin/block/${id}`,

{},

{

headers

}

);



alert("User Blocked");


loadUsers();



}

catch(error){

alert(
error.response?.data?.message
);

}


};









// UNBLOCK USER


const unblockUser = async(id)=>{


try{


await API.put(

`/admin/unblock/${id}`,

{},

{

headers

}

);



alert("User Unblocked");


loadUsers();



}

catch(error){

alert(
error.response?.data?.message
);

}



};









return(


<div className="admin-container">



<h1>
SecureBank Admin Panel
</h1>








<div className="stats-container">


<div className="stat-card">

<h3>Total Users</h3>

<h2>{stats.users}</h2>

</div>




<div className="stat-card">

<h3>Total Accounts</h3>

<h2>{stats.accounts}</h2>

</div>





<div className="stat-card">

<h3>Total Transactions</h3>

<h2>{stats.transactions}</h2>

</div>


</div>









{/* USERS */}


<div className="section">


<h2>
All Users
</h2>



<table className="table">


<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Status</th>

<th>Action</th>


</tr>

</thead>





<tbody>


{

users.map(user=>(


<tr key={user._id}>


<td>
{user.name}
</td>


<td>
{user.email}
</td>


<td>
{user.role}
</td>


<td>

{

user.isBlocked

?

"Blocked"

:

"Active"

}

</td>



<td>


{

user.isBlocked


?

<button

className="unblock-btn"

onClick={()=>unblockUser(user._id)}

>

Unblock

</button>


:


<button

className="block-btn"

onClick={()=>blockUser(user._id)}

>

Block

</button>


}



</td>


</tr>


))


}


</tbody>


</table>



</div>









{/* ACCOUNTS */}



<div className="section">


<h2>
All Accounts
</h2>



<table className="table">


<thead>

<tr>

<th>Account Number</th>

<th>User</th>

<th>Email</th>

<th>Balance</th>


</tr>

</thead>



<tbody>


{

accounts.map(acc=>(


<tr key={acc._id}>


<td>
{acc.accountNumber}
</td>


<td>
{acc.user?.name}
</td>


<td>
{acc.user?.email}
</td>


<td>
₹ {acc.balance}
</td>


</tr>


))


}



</tbody>


</table>



</div>









{/* TRANSACTIONS */}



<div className="section">


<h2>
All Transactions
</h2>




<table className="table">


<thead>

<tr>

<th>User</th>

<th>Account</th>

<th>Type</th>

<th>Amount</th>

<th>Balance</th>


</tr>


</thead>





<tbody>



{

transactions.map(txn=>(


<tr key={txn._id}>


<td>
{txn.user?.name}
</td>


<td>
{txn.account?.accountNumber}
</td>


<td>
{txn.type}
</td>


<td>
₹ {txn.amount}
</td>


<td>
₹ {txn.balanceAfterTransaction}
</td>



</tr>


))


}



</tbody>


</table>



</div>







</div>


);


}



export default Admin;