function faraSpatii(s){
    var arr=s.split(' ')
    return arr.join('')
   
}
var arr0123=function(lung){
    var arr=[]
    for (var i=0;i<lung;i++){ arr.push(i) }
    return arr
}
function fiecareKey(o,f){
    var arrKey=Object.keys(o)
        arrKey.forEach(function(e){
            
        })
}

//faraSpatii('caca maca e la tine n troaca')





var arrLocatii=['demo-location'
                ,'furnizor'
                ,'musteriu'
                ,'diverse'
                ,'c46idm'
                ,'99unr'
                ,'b52idm'
                ,'855drg'
                ,'drg.depo'
                ,'acs.depo'
                ,'488drg'
                ,'45unr'
                ]
var oLocatii={ii:arrLocatii
              ,prp:[{tip:'element'}]
             }
var oFilduri={ii:[]
             ,tip:'element'
             ,bifat:[5,8]
            }
var oActivities={ii:arrActivities
                 //,titluri:['vanzare','intrare de la:','iesire catre:','retur client'] 
                 ,tip:{titlu:[0,1,9,17]
                      ,element:'titlu'
                     }
                }

var arrMeniu={idItems:['LOCATII:','demo-location','ACTIVITATI:','vanzare']
              ,tip:['titlu','']
             }
var arrActivities=['vanzare'
                   ,'intrare de la:'
                        ,'45unr-i'
                        ,'99unr-i'
                        ,'b52idm-i'
                        ,'855drg-i'
                        ,'drg.depo-i'
                        ,'acs.depo-i'
                        ,'furnizor-i'
                   ,'iesire catre:'
                        ,'45unr-o'
                        ,'99unr-o'
                        ,'b52idm-o'
                        ,'855drg-o'
                        ,'drg.depo-o'
                        ,'acs.depo-o'
                        ,'furnizor-o'
                   ,'retur client'
                  ]
var arrTipElmActivities=['element','element','element','folderu'
                          ,'elmFolder' ,'elmFolder' ,'elmFolder' ,'elmFolder' ,'elmFolder','elmFolder','folderu'
                          ,'elmFolder' ,'elmFolder' ,'elmFolder' ,'elmFolder' ,'elmFolder' ,'elmFolder'
                          ,'element'
                        ]
    
    

var obLocatii={
    'furnizor':'1'
    ,'musteriu':'2'
    ,'diverse':'3'
    ,'c46idm':'4'
    ,'99unr':'5'
    ,'b52idm':'6'
    ,'855drg':'7'
    ,'drg.depo':'8'
    ,'acs.depo':'9'
    ,'488drg':'10'
    ,'45unr':'11'

}

var obSD={
        "sursa":[
            'furnizor'
            ,'furnizor'
            ,'furnizor'
            ,'furnizor'
            ,'furnizor'
            ,'c46idm'
            ,'c46idm'
            ,'c46idm'
            ,'c46idm'
            ,'c46idm'
            ,'b52idm'
            ,'c46idm'
            ,'furnizor'
            ,'c46idm'
            ,'furnizor'
            ,'furnizor'
            ,'b52idm'
            ,'b52idm'

        ]
        ,"dest":[
            'c46idm'
            ,'c46idm'
            ,'c46idm'
            ,'c46idm'
            ,'c46idm'
            ,'musteriu'
            ,'b52idm'
            ,'musteriu'
            ,'musteriu'
            ,'b52idm'
            ,'musteriu'
            ,'musteriu'
            ,'c46idm'
            ,'musteriu'
            ,'c46idm'
            ,'b52idm'
            ,'musteriu'
            ,'c46idm'

        ]
}

function cladescCodTransfer(obSD,obLocatii){
    var arez=[]
    for (var i=0; i<obSD.sursa.length; i++){
                arez.push(obLocatii[obSD.sursa[i]]+"s"
                      + obLocatii[obSD.dest[i]]+"d" )  
    }
    return arez
}



function transferLocatii(){
    this.locatii=[]
    this.idxNumeLoc={}
    
    this.activitatiTransfer={}
    this.crtIdx=0
    this.locMusteriu='musteriu'
    
    
}
transferLocatii.prototype={
    adaugLocatie:function(nume){
        this.locatii.push({nume:nume
                        
        })
        this.idxNumeLoc[nume]=this.crtIdx
        this.crtIdx++
    }
    ,cladescOtransfer:function(locSursa,locDest){
        this.oTransfer={}
        this.oTransfer['sursa']=locSursa
        this.oTransfer['dest']=locDest
        this.oTransfer['cod']=this.idxNumeLoc[locSursa]+'s'+
                                    this.idxNumeLoc[locDest]+'d'
    }
    ,cladescOactivitatiTransfer:function(){
        var sursa ,dest ,aista=this ,oRef={iesireCatre:[] ,intrareDela:[]} 
        this.locatii.forEach(function(e,i,a){
            sursa=e.nume
            aista.locatii.forEach(function(e,i,a){
                dest=e.nume
               switch (dest) {
                   case sursa:
                    break; 
                    case aista.locMusteriu:
                       aista.cladescOtransfer(sursa,dest)
                       oRef['vanzare']=aista.oTransfer
                    break;
                    default:
                        aista.cladescOtransfer(sursa,dest)
                        oRef.iesireCatre.push(aista.oTransfer)
                   
               }
            })
        })
    }
}

/*
    var x=new transferLocatii()
    arrLocatii.forEach(function(e,i,a){
        x.adaugLocatie(e)
    })
    
    x.cladescOactivitatiTransfer()
*/
 
 
function menuLocTransfer(){
    this.arrItems=[]
    this.arrLoc=[]
    this.arrLocUser=[]
    this.arrAT=[] //AT - Activitati Transfer
    this.oAT={}   //obiect AT
    this.oATuser={}
    this.locMusteriu=''
    this.crtLoc=''
    this.idxAT=0
} 
menuLocTransfer.prototype={
    adaugLoc:function(numeUser){
        this.arrLoc.push(faraSpatii(numeUser))
         this.arrLocUser.push(numeUser)
    }
    ,cladescArrViuuItems:function(){
        
        var arrKey=Object.keys(this.oAT)
            ,oAT=this.oAT
            ,oATuser=this.oATuser
            ,ai=this.arrItems
            ,arrAT=this.arrAT
            ,idx=0
            
        arrKey.forEach(function(e){
            if (oAT[e].length>1) {
                            ai.push({nume:e
                                     ,numeUser:oATuser[e]
                                     ,clasa:'titluGrup'})
                            oAT[e].forEach(function(e){
                                ai.push(arrAT[e])
                            })
            } else {
                    ai.push(arrAT[oAT[e]])
            }
        })
        
    }
    ,adaugAT:function(sd,loc,numeUser){//sd-sursa sau destinatie
        var sursa,dest,nume=faraSpatii(numeUser)
        if (sd=='s') {sursa=loc; dest=this.crtLoc}
            else {dest=loc; sursa=this.crtLoc}
        this.arrAT.push({sursa:sursa
                          ,dest:dest
                          ,nume:nume
                          ,numeUser:numeUser
                          ,idx:this.idxAT
                          ,clasa:'elmList'
                        })
        this.idxAT++
    }
    ,adaugGrupAT:function(arrIdx,numeGuser){//AT - Activitati Transfer
        var arrAT=this.arrAT
            ,numeGrup=faraSpatii(numeGuser)
       
        arrIdx.forEach(function(e){
                arrAT[e]['numeGrup']=numeGrup
                arrAT[e]['numeGuser']=numeGuser
                arrAT[e]['clasa']='elmGrup'
        })
    }
    ,cladescOAT:function(){
        var oRef=this.oAT
            ,oUser=this.oATuser
        this.arrAT.forEach(function(e,i){
             if (e.numeGrup){
                    if (oRef[e.numeGrup])  oRef[e.numeGrup].push(i)
                            else {oRef[e.numeGrup]=[]
                                  oRef[e.numeGrup].push(i)
                                  oUser[e.numeGrup]=e.numeGuser
                                 }
             } else {oRef[e.nume]=[]
                     oRef[e.nume].push(i)
                     oUser[e.nume]=e.numeUser
                    }
        })
    }
    ,setCodTransfer:function(oElm){
        oElm['codT']='s'+oElm.sursa+'d'+oElm.dest
    }
    
}




var fvi={filtreSetate:['brand: mango']
                 ,filtreDisponibile:['culoare','tipProdus','...']
                 ,valFiltre:[]
                 ,items:[]
            
        }
function dateleFVI(oFVI){
    this.fvi=oFVI
    this.fviOrdine=['filtreSetate','filtreDisponibile','valFiltre','items']
}
dateleFVI.prototype={
    idxCeModul:function(idx){
        
    }
}

var aduMcontent=function(){
    console.log('de aici vine continutu')
    return 'ia la tata'
}
var altContinut=function(){
    console.log(' vine continutu doi')
    return 'ia de aici'
}

var obect={nume:['cacao','macaco']
           ,executabile:[aduMcontent ,altContinut]
}

var cladescCeva=function(alege){
    var vloco
    switch (alege) {
        case 'carici':
        break;
        case 'astada':
           vloco=obect.executabile[0]() 
           console.log(vloco)
           vloco=obect.executabile[1]() 
           console.log(vloco)
        break;
    }
}
cladescCeva('astada')


//var fltab=new fTabOavdAim(obLoco.datele)
var filduriValMultiple=[2,5]
var filduri=['denumire','tipProdus','culoare','brand','numeFurnizor','masura','pretRec']
var aduArrVmultiple=function(){
    var arez=[]
    filduriValMultiple.forEach(function(e){
        arez.push(filduri[e])
    })
        return  arez
}

var itemPagina={items:{foldare:aduArrVmultiple
                       ,actualizareFtab:true
                      }
                ,prp:{tip:{titlu:'numeFoldar'
                           ,elm:'elmFoldar' 
                          }
                }
    }
var listaFoldare={
    
}
 var cladescFolderLista=function(o){
        //o={arrFoldareSetate:[{}] ,idxFdeschis:0 ,arrNumeFoldare:['']}
        var ii=[] ,prp=[]  
            //,avm=arrNumeFoldare.arrValMultiple
            ,arez ,orez={} 
        if (o.arrFoldareSetate)
        o.arrFoldareSetate.forEach(function(e,i){
             ii.push(e.k+' : '+e.v)
             prp.push({tip:'foldarSetat'
                       ,bifat:true
                      })
        })
        o.arrNumeFoldare.forEach(function(e,i){
            ii.push(e)
            switch (i) {
                case o.idxFdeschis :
                        prp.push({tip:itemPagina.prp.tip.titlu //'numeFoldar' 
                                  ,semnFold:'glyphicon glyphicon-menu-up alinD'
                                 })
                        arez=tabelFiltrare.obtAvd(e)
                        arez.forEach(function(e){
                            ii.push(e)
                            prp.push({tip:itemPagina.prp.tip.elm //'elmFoldar'
                                      
                                     })
                        })
                break;
               
                default:
                       prp.push({tip:itemPagina.prp.tip.titlu //'numeFoldar'
                                 ,semnFold:'glyphicon glyphicon-menu-down alinD'
                                })
            }
        })
        orez.ii=ii
        orez.prp=prp
        return orez
    }
    
 var actFoldareUDA=function(idx,datele){ //actiuni foldare unu dupa altu
                          var x=datele[idx].tip
                            switch (x) {
                               case 'titlu':

                               break;
                               case 'element':

                               break;
                            }      
                }
 var actiune={
                locatii:function(idx,datele){
                             
                } 
                ,itemPage:actFoldareUDA
                //,
        }

var lista={ii:[]
           ,prp:[]
          }

var initiereDateLista=function(o){
    var oi={items:{foldare:[]}}
    if (typeof o.items.foldare==='function') {
               oi.items.foldare=o.items.foldare()
              // if (o.items.actualizareFtab)
                  
                    
    }
    return  oi.items.foldare
    
}

//initiereDateLista(itemPagina)















/*
var locu=new menuLocTransfer()
    function cladescLocatii(){
        arrLocatii.forEach(function(e){
            locu.adaugLoc(e)
        })
    }
    locu.crtLoc='c46idm'
    var ar=locu.arrLoc
    function cladescArrAT(){
        ar.splice(ar.indexOf(locu.crtLoc),1)
        ar.forEach(function(e){
            switch (e){
                case 'musteriu':
                    locu.adaugAT('d',e,'vanzare la taraba')
                break;
                default :
                    locu.adaugAT('d',e,e)
            }
        })
        ar.forEach(function(e){
            switch (e){
                case 'musteriu':
                    locu.adaugAT('s',e,'returul Clientului')
                break;
                default :
                    locu.adaugAT('s',e,e)
            }
        })
        
    }

    cladescLocatii()
    cladescArrAT()
    locu.adaugGrupAT([0,1,3,4,5,6,7,8,9,10],'iesiri  -Catre')
    locu.adaugGrupAT([11,12,14,15,16,17,18,19,20,21],'intrari-  Dela')
    locu.cladescOAT()
    locu.cladescArrViuuItems()
*/
/*
    this.arrItems.push({nume:'locatii'
                            ,numeUser:'L o c a t i o n s'
                            ,clasa:'titlu'
                            ,titlu:'locatii'
                           }
                           ,{nume:this.crtLoc
                             ,numeUser:this.crtLoc
                             ,clasa:'element'
                             ,titlu:'locatii'
                             ,bifat:true
                            }
                           ,{
                             nume:'ActivitatiTransf'
                             ,numeUser:'Activitati transferuri'
                             ,clasa:'titlu'
                             ,titlu:'atransf'
                            }
                          )
*/
    var stai








