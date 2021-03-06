import * as User from "../models/userModel.js";

User.init()
let user=User.getUserLogged()
let cluesN = document.querySelector("#cluesN")
let pointsN = document.querySelector("#pointsN")
cluesN.innerHTML = user.clues
pointsN.innerHTML = user.points

let btns=document.querySelectorAll('.comprar-clues')
for (let btn of btns) {
    btn.addEventListener('click', function () {
       let nome=this.parentNode.previousElementSibling.previousElementSibling.innerHTML
        let coise=document.querySelector('#nomeCompra')
        coise.innerHTML=nome
       $("#cluesModal").modal('show');
       let preco=this.parentNode.previousElementSibling.innerHTML
       
       let precoNum = +preco.slice(0,2)
       
       const conf=document.querySelector('#confirmar_compra')
       conf.addEventListener('click',function(){
        if(precoNum<=user.points){
            let numPista = +nome.slice(0,1)
            
            user.clues+=numPista
            user.points -= precoNum
            alert('A compra foi efetuada')
            $("#cluesModal").modal('hide');
            sessionStorage.setItem('loggedUser', JSON.stringify(user))
            User.attUserOnStorage(user)
            document.querySelector('#cluesN').innerHTML = user.clues
            document.querySelector('#pointsN').innerHTML = user.points
        }else{
            alert('Não tem pontos suficientes para fazer esta compra')
            $("#cluesModal").modal('hide');
        }
       }) 
    })
}

const btns2=document.querySelectorAll('.comprar-stickers')
for (const btn2 of btns2) {
    btn2.addEventListener('click', function () {
        let nome=this.parentNode.previousElementSibling.previousElementSibling.innerHTML
        let coise=document.querySelector('#nomeCompra2')
        coise.innerHTML=nome
        let getId = this.parentNode.previousElementSibling.previousElementSibling.id
        
        $("#stickersModal").modal('show');
        let preco=this.parentNode.previousElementSibling.innerHTML
       
        let precoNum = +preco.slice(0,2)
        
        const conf=document.querySelector('#confirmar_compra2')
        conf.addEventListener('click',function(){
            if(precoNum<=user.points){
                if(user.stickersBuy.indexOf(`../media/stickers/${getId}.svg`) === -1){
                    user.stickersBuy.push(`../media/stickers/${getId}.svg`);
                    user.points -= precoNum;
                    $("#stickersModal").modal('hide');
                    alert('A compra foi efetuada')
                    
                    sessionStorage.setItem('loggedUser', JSON.stringify(user))
                    User.attUserOnStorage(user)

                } else {
                    alert("Este sticker já foi comprado");
                    $("#stickersModal").modal('hide');
                }
                
            }else{ 
                alert('Não tem pontos suficientes para fazer esta compra')
                $("#stickersModal").modal('hide'); 
                
            }
        }) 
        })
}