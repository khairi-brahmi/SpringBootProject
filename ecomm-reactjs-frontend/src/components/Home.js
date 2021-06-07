import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Home = () => {
  let storage = localStorage.getItem("user");
  let user = JSON.parse(storage || JSON.stringify({}))
console.log(user)
  const classes = useStyles();
const [dataa,setDataa]=useState([]);

let token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMSIsImlhdCI6MTYyMzAxMDI1NywiZXhwIjoxNjIzNjE1MDU3fQ.ZDisis2KlSessqvjUM8aTAUdJtqsxGwCiQvjLJFR9LFHQWVu3EJ_EfOvNEZ9uF0UaqN4J0dkMKkV8Fm2tjHLOg"
async function getProducts(){

await axios.get('http://localhost:8080/api/product/getAll',{ headers: {Authorization: 'Bearer ' + token}})
.then(res => {
  setDataa(res.data)
  console.log('result',res.data)

})
.catch((e)=>console.log(e))
console.log("hh",dataa) 

}

var prodCart=[]
var dataOrder=[]
const [count, setCount] = React.useState(0);
async function addProd(id,name,price){
  let x={
    "name":name,
    "price":price
  }
setCount(count+1)
var dataItem={
  "productId":id,
  "userId":10,
  "qty":quantity,
  "price":price
}
dataOrder.push(dataItem)
console.log(dataOrder)
  }
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e, id) => {
    setQuantity(e.target.value);
    
  };
useEffect(()=>{
  getProducts()
},[])
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  return (
    <div className={classes.root}>
    <AppBar position="static">
  
    {localStorage.getItem("user")?
  <Toolbar>
  <IconButton onClick={handleClickOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
  
  <Badge badgeContent={count} color="secondary">
  <ShoppingBasketIcon/>
</Badge> Panier
    </IconButton>
      <IconButton href="/client" edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
  <AccountCircleIcon/> {user.user.name}
 </IconButton>
 <IconButton onClick={async () => {
                    
                       localStorage.removeItem("user"),
                       window.location.replace("/")
                   }}
 edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
  <ExitToAppIcon/>
 </IconButton>
 </Toolbar>
  
 
 :
 <Toolbar>
 <IconButton onClick={handleClickOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

 <Badge badgeContent={count} color="secondary">
  <ShoppingBasketIcon/>
</Badge>  Panier
   </IconButton>
     <IconButton href="/client" edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
 <AccountCircleIcon/> Se Connecter
</IconButton>

</Toolbar>
  
}
  

</AppBar>
    <div className="container">
      
      <div className="products">
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Panier</DialogTitle>
        <DialogContent>
        <Grid container spacing={3}>
        <Grid item xs>
        <b>Hello</b>
       <p>bbb</p>
        </Grid>
        <Grid item xs>
        <div className="btn-trash">
            <button>
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </Grid>
        </Grid>
          
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          Passer la commande
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        {dataa.map((d) => {
          return (
            <div className="image" key={d.id}>
              <img src="https://www.qries.com/images/banner_logo.png" />
              <h3>{d.name}</h3>
              <p>{d.description}</p>
              <div className="content">
                <h3 className="price">Prix: {d.price} $</h3>
              
                <button onClick={() => addProd(d.id,d.name,d.price,3)} className="addCart">
                  Ajouter au Panier
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};


export default (Home);
