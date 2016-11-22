var uneleIntersect2arr=function(arr1,arr2){
    var arez=[], arrScurt=[] ,arrLung=[] ,i=0
    function unele(ef){
        return arrLung.some(function(es){
            i++
            return ef==es
        })
    }
    if (arr1.length>arr2.length)  {arrLung=arr1
                                    arrScurt=arr2}
                            else  {arrLung=arr2
                                    arrScurt=arr1}
    arrScurt.forEach(function(ef){
        if (unele(ef))  arez.push(ef) 
    })
}
function idxSort(arr){
    var h=arr.map(function(e,i){
                    return {idx:i,vlr:e} // return {idx:i,vlr:e.toLowerCase()}            
                    })
     h.sort(function(a,b){
        return a.vlr>b.vlr ? 1:-1;
    })
    return h.map(function(e){
        return e.idx ;
    })
  
}
var arrIsort=function(arrIdx,arrDate){
     var h=[]
     arrIdx.forEach(function(e,i,a){
       h.push({idx:e
               ,vlr:arrDate[e]}
             )
   })
     h.sort(function(a,b){
        return a.vlr>b.vlr ? 1:-1;
    })
    return h.map(function(e){
        return e.idx ;
    }) 
  } 

var arrSortObect=function(arrIdx,arrDate){
     var h=[]
     arrIdx.forEach(function(e,i){
       h.push({idx:e
               ,vlr:arrDate[i]}
             )
   })
     return h.sort(function(a,b){
        return a.vlr>b.vlr ? 1:-1;
    })
 
  } 

function fTabOavdAim(oDatele){
    this._oDatele=oDatele
	this.aTcol=Object.keys(oDatele)
	this.asTcol=this.aTcol
	this.filtre=[]
    this.oAvd={}
    this.oAic={}
    this.aicNivel=0
    this.avd1elm=false
    
							
		       var  aRecLung=oDatele.idxC.asi.length
	            this.aim=[]             
                for (var i=0; i < aRecLung; i++) { this.aim[i]=i  }
                this.aic=this.aim	   
                
     var cladesc_oAvd=function(aic,arrVal){   
        
                        var oArrSort=arrSortObect(aic,arrVal)
                            ,elmSir
                            ,salvElmSir 
                            ,oAvd={asi:[] ,avd:[] ,ieb:[]} 
                            ,contoar=0
                        salvElmSir=oArrSort[0].vlr
                       
                        oAvd.avd[contoar]=salvElmSir
                        oAvd.ieb[0]=0
                        
                        oArrSort.forEach(function(e,i,a){
                                elmSir=e.vlr
                                if (salvElmSir!=elmSir){
                                        salvElmSir=elmSir
                                        contoar++
                                        oAvd.avd[contoar]=salvElmSir
                                        oAvd.ieb[contoar]=i
                                } 
                        })
                    oAvd.asi=oArrSort.map(function(e){
                                                    return e.idx
                                            })
         return oAvd
         }
     this.coavd=function(k,arrVal){
         this.oAvd[k]=cladesc_oAvd(this.aic,arrVal)
     }
                                            //dataRef este un oAvd:{asi=[],avd:[],ieb:[]}
     var cladesc_oAic=function(v,dataRef){ 
         var idx=dataRef.avd.indexOf(v)
         var  bv ,fv ,bi ,fi ,iebL ,asiL ,aRez=[] ,iter=0
            iebL=dataRef.ieb.length
            asiL=dataRef.asi.length
            bi=idx
            fi=idx+1
            bv=dataRef.ieb[bi]
           if (bi==(iebL-1))  fv=asiL
                        else  fv=dataRef.ieb[fi]
           
                   for (var i=bv; i<fv; i++){
                       aRez[iter]=dataRef.asi[i]
                       iter++
                   }
                 return aRez
     }
  
     this.coaic=function(k,v,avdRef){//this._oDatele
        this.oAic[k]={}
         this.oAic[k][v]=cladesc_oAic(v,avdRef[k])
         
     }
    
   
}
fTabOavdAim.prototype={
    clonaIeb:function(dataRef){ //dataRef=oAvd
                //return o copie(clona modificata) a unui arr ieb (idx element begin) din oAvd
                // modifica clona - 1. inlatura arr[0]; 2. adauga(push) asi.length
        
        var clonaIeb=JSON.parse(JSON.stringify(dataRef.ieb)) //cloneaza ieb[]
            clonaIeb.splice(0,1)
            clonaIeb.push(dataRef.asi.length)
        return clonaIeb
    }
  ,obtAicAvd:function(oAvd){//return oAic ce contine aic pentru toate VD din avd
    var iebM=this.clonaIeb(oAvd)
    var oRez={} ,incepandLa=0 ,aRez
   
      iebM.forEach(function(e,i,a){
            aRez=oAvd.asi.slice(incepandLa,e)
            incepandLa=e
            oRez[oAvd.avd[i]]=aRez
        })
   
    return oRez
  }   
  ,insumareValAicK:function(k,aic){
       var listVal=this.obtValK(k,aic) 
       var rez=0
       
            listVal.forEach(function(e,i,a){
                rez+=e
            })
        return rez
  }       
  ,obectTabelKAic:function(arrK,aic){ //returneaza un obiect cu fild-urile din arrK 
                                                  //pentru valorile indexilor din aic
    var oRez={}
        ,aRez=[]
        ,aista=this
    arrK.forEach(function(e,i,a){
       oRez[e]=aista.obtValK(e,aic)     
    })
    return oRez
} 
   /* ,arrObectTabelKAic:function(obectKarr){ //returneaza un array de obiecte 
                                                  //pe baza unui obect returnat de obectTabelKAic()
    var aRez=[]
        ,aista=this
    arrK.forEach(function(e,i,a){
       oRez[e]=aista.obtValK(e,aic)     
    })
    return oRez
    }   */ 
  ,obtValK:function(k,aic){
        function esteMaiMic(e,i){
            rez=i
            return idx<e
        }
        function idxIeb(){
           clonaIeb.some(esteMaiMic)
        }
        function cArrVal(e,i){ //cladesc arr val
            arez.push(dataRef.avd[e])
        }
        var dataRef=this._oDatele[k]
        var clonaIeb=this.clonaIeb(dataRef)
        var arez=[] ,aIdxIeb=[] ,rez ,idx  
        
          aic.forEach(function(e,i,a){
              idx=dataRef.asi.indexOf(e)
              idxIeb()
              aIdxIeb.push(rez)
          })
          aIdxIeb.forEach(cArrVal)
          return arez
    }
  ,obtAvd:function(k){
      if (this.filtre.length==0) return this._oDatele[k].avd
                    else {
                        if (this.oAvd[k]==undefined) {
                                this.obtAvd_2(k)
                                if (this.oAvd[k].avd.length==1) this.avd1elm=true
                                            else this.avd1elm=false
                        }
                        return this.oAvd[k].avd
                    }
  }    
  ,obtAvd_2:function(k){
      var listVal=this.obtValK(k,this.aic)  
    //,obect=this.obtRecArrKaic(['denumire','cod','culoare','brand','tipProdus'],this.aic)
          this.coavd(k,listVal)
          
  } 
  
  ,aicNou:function(k,v){
                                                                        //this.aicNivel++
      if (this.aicNivel==0) this.coaic(k,v,this._oDatele)
                        else this.coaic(k,v,this.oAvd)
  this.oAvd={}  //reset oAvd pentru un aic nou
      this.aic=this.oAic[k][v]
     // if (this.aic.length==1) this.aicEsteUnu=true
  }
  ,adaugFiltru:function(k,v){
      this.filtre.push({k:k
                       ,v:v})
      
      this.aicNou(k,v)
       this.aicNivel++
     
  }
  ,stergFiltru:function(i){
      var kr ,vr ,ss=this
      this.aicNivel=0
     this.filtre.splice(this.filtre.length-1-i,1)
     this.oAic={}
     this.aic=this.aim
     this.filtre.forEach(function(e,i,a){
         kr=e.k
         vr=e.v
          if (ss.aicNivel>0) ss.obtAvd_2(kr)
         ss.aicNou(kr,vr)
         ss.aicNivel++
     })
  }
    
 // ,obtAvdFiltru:function(k){
 //    return this.obtAvdKeyX(k)
//  }    
 // ,setKeyActiva:function(k){
 //     this.oActualizKeys[k]=true
 // }
  
  ,obtKlistAvdMM1:function(arrK){//poate primi si al doilea argument daca se doreete un anumit ArrIndexuriCurent
      //primeste un arr cu keys obectului datele pentru care se doreste returnarea unei liste cu keys a caror ArrValoriDistincte este MaiMare decat 1
      var aic=this.aic
          ,listVal
     if (arguments[1]) aic=arguments[1]
     arrK.forEach(function(e){
         listVal=this.obtValK(e,aic)  
          this.coavd(e,listVal)
     })
     
  }
  
  
}//sf.fTabOavdAim.prototype


//var arrOavd=function(k){   //cladeste obectul oAvd={avd:[],ieb:[],asi:[]} care contine un arr cu valorile distincte ale elementelor din arraiul oDatele[k] si un arr cu ieb - index unde elementul begin(incepe) in cadrul arr returnat de idxSort(oDatele[k])
//asi=araiul cu indexi ce reprezinta sortarea arrRef ; avd=araiul cu valorile distincte extrase din arrRef ; ieb=araiul cu indexii unde incepe elementul din lista avd ;

/*
obtAicAvd()
insumareValAicK()
aicNivel=99
filtre=[]
oAic={}
obtAvd()
adaugFiltru()
*/
