import "../styles/dashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";



function Dashboard(){


const navigate = useNavigate();



const [user,setUser] = useState(null);

const [account,setAccount] = useState(null);

const [depositAmount,setDepositAmount] = useState("");

const [withdrawAmount,setWithdrawAmount] = useState("");

const [transferAmount,setTransferAmount] = useState("");

const [receiverAccount,setReceiverAccount] = useState("");

const [transactions,setTransactions] = useState([]);

const [loading,setLoading] = useState(true);






// LOAD DATA

const loadData = async()=>{


try{


setLoading(true);



const profile = await API.get(
"/user/profile"
);


setUser(profile.data);






try{


const accountData = await API.get(
"/account/balance"
);


setAccount(accountData.data);



}

catch{


setAccount(null);


}







const transactionData = await API.get(
"/transactions"
);



setTransactions(

transactionData.data.transactions ||
transactionData.data ||
[]

);



}


catch(error){


console.log(error);


navigate("/login");


}


finally{


setLoading(false);


}


};








useEffect(()=>{


const token =
localStorage.getItem("token");



if(!token){

navigate("/login");

return;

}


loadData();



},[]);









// CREATE ACCOUNT

const createAccount = async()=>{


try{


const res =
await API.post(
"/account/create"
);



alert(
"Account Created Successfully"
);



setAccount({

accountNumber:
res.data.account.accountNumber,


balance:
res.data.account.balance

});



}

catch(error){


alert(

error.response?.data?.message ||

"Account creation failed"

);


}


};









// DEPOSIT

const depositMoney = async()=>{


try{


await API.post(

"/account/deposit",

{

amount:Number(depositAmount)

}

);



setDepositAmount("");


alert("Deposit Successful");


loadData();



}

catch(error){


alert(

error.response?.data?.message ||

"Deposit failed"

);


}



};









// WITHDRAW

const withdrawMoney = async()=>{


try{


await API.post(

"/account/withdraw",

{

amount:Number(withdrawAmount)

}

);



setWithdrawAmount("");


alert("Withdraw Successful");


loadData();



}

catch(error){


alert(

error.response?.data?.message ||

"Withdraw failed"

);


}



};









// TRANSFER

const transferMoney = async()=>{


try{


await API.post(

"/account/transfer",

{

receiverAccountNumber:
receiverAccount,


amount:Number(transferAmount)

}

);



setReceiverAccount("");

setTransferAmount("");


alert("Transfer Successful");


loadData();



}

catch(error){


alert(

error.response?.data?.message ||

"Transfer failed"

);


}



};









if(loading){


return (

<div className="loading">

<h2>
Loading SecureBank...
</h2>

</div>

);


}









return(


<div className="dashboard">



<Navbar />






<div className="dashboard-content">






<h1 className="title">

SecureBank Dashboard

</h1>







{
user &&

<div className="card profile-card">


<h2>

Welcome, {user.name} 👋

</h2>


<p>

Email : {user.email}

</p>


<p>

Role : {user.role}

</p>


</div>

}










{
account ?


<>


<div className="stats">


<div className="card">


<h3>

Account Number

</h3>


<p>

{account.accountNumber}

</p>


</div>





<div className="card">


<h3>

Available Balance

</h3>


<h1 className="balance">

₹ {account.balance}

</h1>


</div>


</div>









<div className="card">


<h2>
Deposit Money
</h2>



<input

type="number"

placeholder="Enter Amount"

value={depositAmount}

onChange={
e=>setDepositAmount(e.target.value)
}

/>



<button onClick={depositMoney}>

Deposit

</button>


</div>









<div className="card">


<h2>
Withdraw Money
</h2>



<input

type="number"

placeholder="Enter Amount"

value={withdrawAmount}

onChange={
e=>setWithdrawAmount(e.target.value)
}

/>



<button onClick={withdrawMoney}>

Withdraw

</button>


</div>









<div className="card">


<h2>
Transfer Money
</h2>



<input

placeholder="Receiver Account Number"

value={receiverAccount}

onChange={
e=>setReceiverAccount(e.target.value)
}

/>



<input

type="number"

placeholder="Amount"

value={transferAmount}

onChange={
e=>setTransferAmount(e.target.value)
}

/>



<button onClick={transferMoney}>

Transfer

</button>


</div>



</>



:


<div className="card">


<h2>
No Account Found
</h2>


<button onClick={createAccount}>

Create Account

</button>


</div>


}









<div className="transaction card">


<h2>
Transaction History
</h2>




{

transactions.length > 0 ?


transactions.map((txn)=>(


<div

className="transaction-item"

key={txn._id}

>


<span>

{txn.type}

</span>


<span>

₹ {txn.amount}

</span>


<span>

{
new Date(
txn.createdAt
).toLocaleDateString()
}

</span>


</div>


))


:


<p>
No transactions found
</p>


}



</div>





</div>



</div>


);


}



export default Dashboard;