

// var fbsRef = new Firebase("https://ftab00.firebaseio.com/");
  //var xx=cladescCodTransfer(obSD,obLocatii)

   var fbs_oAvdAim=obLoco.datele
  
   
  var claseSelectare={
                validare:{
                    gol:{icb:true ,icbinactiv:true ,icbactiv:false}
                    ,bifat:{icb:true ,icbinactiv:false ,icbactiv:true}
                }
                ,radio:{
                    gol:{irb:true ,irbinactiv:true ,irbactiv:false}
                    ,bifat:{irb:true ,irbinactiv:false ,irbactiv:true}
                }
    }    
  
var app=angular.module('appStockAdmin',['numeDrctve'])
   
    app.controller('mainFiltreCtrl',function($rootScope,$scope,$filter){
    var ultRadio
        ,crtNumek
        ,initialArrCateg=[]
        ,crtOactivities={tip:'interogare'}
        ,oCateg={}
        ,nPagini={vd:function(arrLung){
                    return Math.ceil(arrLung/$rootScope.elementePerPagina.vd)-1
                        }
                  ,rf:function(arrLung){
                    return Math.ceil(arrLung/$rootScope.elementePerPagina.rf)-1
                        }
                  }
        ,rezFiltrareK='denumire'
       
    
    $rootScope.viuuDate={c:[] ,v:[] ,rf:[]}
    $rootScope.crtPag={vd:0 ,rf:0}
    $rootScope.elementePerPagina={vd:5 ,rf:7}
    $rootScope.nPagini={vd:0 ,rf:0}
    $rootScope.oTabelKaic={dateK:{}
                           ,sortare:{}}
    $rootScope.comutaVizibil=function(x){
        $scope.vizibil[x]=!$scope.vizibil[x]
    }
    $rootScope.setVizibil=function(x){
        $scope.vizibil[x]=true
    }
    //$rootScope.setNevizibil=function(x){
    //    $scope.vizibil[x]=false
    //}
    
    $scope.listActivitati=[{nume:'vanzare'
                           ,tip:'interogare'
                          }
                          ,{nume:'intrare'
                           ,tip:'modificare'
                          }]
    $scope.vizibil={cMeniu:false
                    ,key:false 
                    ,val:true
                    ,pivot:false
                    ,interogare:true
                    ,modificare:false
                    ,filtre:true
                    ,valFiltre:true
                    ,rfitems:true
                    ,pagViuu:true
                    ,locations:false
                    ,fvi:false
    }
    $scope.scrisu=''
    $scope.textButonFiltru="Filtre: "
    $scope.textCautare="type"+rezFiltrareK  
    $scope.nPatrate=0
    $scope.idxCrtKey=0
   
    
 /*   var cobor_oAvdAim=function(){   
                            fbsRef.once("value"
                                        ,function(snapshot){
                                                fbs_oAvdAim=snapshot.val().oAvdAim.datele
                                                cladescViuuDateArr()
                                                fTab=new fTabOavdAim(fbs_oAvdAim)
                                        })
                      }
 */   
     var cladescViuuDateArr=function(){  
         angular.forEach(fbs_oAvdAim
                         ,function(v,k){
                              this.push({nume: k
                                         ,numeAfisat:k
                                         ,radioButon:true
                                         ,gol:true
                                         ,stare:claseSelectare.radio.gol
                                        })
                         }
                         ,initialArrCateg)
                $rootScope.viuuDate.c=initialArrCateg
  }
    //cobor_oAvdAim()
    cladescViuuDateArr()
    
    $rootScope.fTab=new fTabOavdAim(fbs_oAvdAim)
    var rftab=$rootScope.fTab
    
     var oTestAic=rftab.obtAicAvd(fbs_oAvdAim.culoare)
     var oTestSume={}
     
     for (var k in oTestAic){
         oTestSume[k]=rftab.insumareValAicK('BUC',oTestAic[k])
     }
    
    var comutaSelect=function(i){
                var iref=$rootScope.viuuDate.c[i]
                    ,uref=$rootScope.viuuDate.c[ultRadio]
                if (iref.radioButon) {
                            if (iref.gol){            
                                    iref.gol=false
                                    iref.stare=claseSelectare.radio.bifat
                                    if(uref) {
                                            uref.gol=true  
                                            uref.stare=claseSelectare.radio.gol
                                    }  
                                    ultRadio=i
                            }
                }else{                                                     
                    iref.radioButon=true
                    iref.gol=true
                    iref.stare=claseSelectare.radio.gol
                }
    }
    var salvOcateg=function(){
        oCateg.ultRadio=ultRadio
        oCateg.arrViuu=$rootScope.viuuDate.c
    }
    var restaurezOcateg=function(){
        ultRadio=oCateg.ultRadio
        $rootScope.viuuDate.c=oCateg.arrViuu
    }
    var resetCateg=function(){
        
    }
    var setViuuDateVal=function(){
       // var fTab=$rootScope.fTab
        if (rftab.aicNivel-1>=0){
        var nf=rftab.filtre[rftab.aicNivel-1]  //nivel filtre
        var rez=rftab.insumareValAicK('BUC',rftab.oAic[nf.k][nf.v])}
        
        switch (crtOactivities.tip){
            case 'interogare':
                 $rootScope.viuuDate.v=rftab.obtAvd(crtNumek)
                 $rootScope.crtPag.vd=0
                 $rootScope.nPagini.vd=nPagini.vd($rootScope.viuuDate.v.length)
                 
                  $rootScope.viuuDate.rf=rftab.obtAvd(rezFiltrareK)
                  $rootScope.crtPag.rf=0
                  $rootScope.nPagini.rf=nPagini.vd($rootScope.viuuDate.rf.length)
            break
            case 'modificare':
                 $rootScope.viuuDate.v=fbs_oAvdAim[crtNumek].avd
            break
        }
       }
    
    
    var resetNume_Filtru=function(i){
        $rootScope.viuuDate.c[i].numeAfisat=$rootScope.viuuDate.c[i].nume
    }
        ,lipesteVal_Filtru=function(i,v){
        $rootScope.viuuDate.c[i].numeAfisat=
        $rootScope.viuuDate.c[i].numeAfisat.concat(': ',v)
    }
        ,scoateDelaN_bagaLaM=function(n,m,a){
        var p=a[n]
        a.splice(n,1)
        a.splice(m,0,p)
    }
    
    $scope.esteRadioKey=function(i,numeKey){
        if (ultRadio!=i){
                $scope.idxCrtKey=i
                $scope.scrisu=''                                 
                crtNumek=numeKey
             setViuuDateVal() //$scope.viuuDate.v=fTab.obtAvd(numeKey)
                
                comutaSelect(i)
             $scope.textCautare='type '+numeKey
    var tbl=rftab.obectTabelKAic(['culoare','denumire','tipProdus','masura','brand']
                                        ,rftab.aic) 
       }
    
    }
    $scope.esteValidareKey=function(i,numeKey){
      // var fTab=$rootScope.fTab
       resetNume_Filtru(i) 
       comutaSelect(i)
       scoateDelaN_bagaLaM(i,$scope.nPatrate-1,$rootScope.viuuDate.c)
       $scope.nPatrate--
       rftab.stergFiltru(i)
      $rootScope.viuuDate.v=rftab.obtAvd(crtNumek)   
       $rootScope.viuuDate.rf=rftab.obtAvd(rezFiltrareK)
    }
    
    
  /*  $scope.apasElmActivitati=function(i){
        crtOactivities= $scope.listActivitati[i]
        $scope.vizibil.fvi=true
    }
*/
    var setFiltruArrCateg=function(v){
            var idx=$scope.idxCrtKey
                lipesteVal_Filtru(idx,v)
                $rootScope.viuuDate.c[idx].radioButon=false
                $rootScope.viuuDate.c[idx].stare=claseSelectare.validare.bifat

                scoateDelaN_bagaLaM(idx,0,$rootScope.viuuDate.c)
                $scope.nPatrate++
                $rootScope.viuuDate.v=[]
                $scope.ultRadio=-1
    }
    $scope.apasElmKey=function(i,numeKey){
        if ($rootScope.viuuDate.c[i].radioButon)
                $scope.esteRadioKey(i,numeKey)
            else    
                $scope.esteValidareKey(i,numeKey)
    }
    $scope.apasElmVal=function(i,v){
       if ($rootScope.viuuDate.v.length>1){         
                setFiltruArrCateg(v)
                if (crtOactivities.tip=='interogare') rftab.adaugFiltru(crtNumek,v)
                $rootScope.viuuDate.rf=rftab.obtAvd(rezFiltrareK)
        }
        
    }
    
   
    $scope.apasBmeniu=function(){
        $scope.vizibil.cMeniu=!$scope.vizibil.cMeniu
   
    }
    $scope.apasElmMenu=function(ghici){
        switch (ghici){
            case "unu": 
                $scope.vizibil.interogare=true
                $scope.vizibil.modificare=false
             break;
             case "doi": 
                $scope.vizibil.interogare=false
                $scope.vizibil.modificare=true
             break;
        }
    }
    $scope.paginareViuu=function(){
        $rootScope.crtPag.vd=0
     
    }
    $scope.seTasteaza=function(){
        //var arr=$filter('filter')($scope.viuuDate.v,$scope.scrisu)
        //$rootScope.nPagini.vd=nPagini.vd(arr.length)
        
        $rootScope.nPagini.vd=nPagini.vd($filter('filter')($scope.viuuDate.v,$scope.scrisu).length)
    }
/*    $scope.comutaViuuFVI=function(k){
        $scope.vizibil[k]=!$scope.vizibil[k]
       // $scope.textCautare='type '+rezFiltrareK
    }
 */   
})
    
    app.controller('pagCtrlVD',function($rootScope,$scope){
       $scope.arataData=function(){
            
            $scope.prevPage = function() {
                            if ($rootScope.crtPag.vd > 0) {
                                                $rootScope.crtPag.vd--}
            };
            $scope.DisablePrevPage = function() {
                                    return $rootScope.crtPag.vd === 0 ? "disabled" : ""
            };
           $scope.nextPage = function() {
                            if ($rootScope.crtPag.vd < $rootScope.nPagini.vd) {
                                                $rootScope.crtPag.vd++
                            }
           }
           
           $scope.DisableNextPage = function() {
                return $rootScope.crtPag.vd === $rootScope.nPagini.vd ? "disabled" : ""
            }
  }
       
       
       })
    app.controller('pagCtrl_rezFiltrare',function($rootScope,$scope){
       $scope.arataData=function(){
            
            $scope.prevPage = function() {
                            if ($rootScope.crtPag.rf > 0) {
                                                $rootScope.crtPag.rf--}
            };
            $scope.DisablePrevPage = function() {
                                    return $rootScope.crtPag.rf === 0 ? "disabled" : ""
            };
           $scope.nextPage = function() {
                            if ($rootScope.crtPag.rf < $rootScope.nPagini.rf) {
                                                $rootScope.crtPag.rf++
                            }
           }
           
           $scope.DisableNextPage = function() {
                return $rootScope.crtPag.rf === $rootScope.nPagini.rf ? "disabled" : ""
            }
  }
       
       
       })
    
    app.controller('meniuPctrl',function($rootScope,$scope){
         $scope.arrViuuData={locatii:[]
                             ,activitati:[]
                             ,meniu:[]
                            }
         $scope.viuuVizibil={locatii:false
                             ,activitati:false
                             ,meniu:false
                             ,adaugLocatii:false
                             ,inpLocatii:true
                            }
         $rootScope.viuuCrtLoc='test-location'
         $rootScope.viuuCrtActivitate=undefined
        var primuViuuActivitati=true
        var locu=new menuLocTransfer()
            ,cladescLocatii=function(){
                arrLocatii.forEach(function(e){
                    locu.adaugLoc(e)
                })
        }
            ,cladescMeniuDatele=function(){
                $scope.arrViuuData.meniu=[]
                var ref=$scope.arrViuuData.meniu
              
                ref.push({numeUser:'L o c a t i e :'
                          ,clasa:'titlu'
                         }
                        ,{numeUser:$rootScope.viuuCrtLoc
                          ,clasa:'element'
                          ,bifat:true
                          ,grup:'locatii'
                        }
                        ,{numeUser:'Activitate transfer :'
                          ,clasa:'titlu'
                        }
                        ,{numeUser:$rootScope.viuuCrtActivitate
                           ,clasa:'element'
                           ,bifat:true
                           ,grup:'activitati'
                         }
              )
                
                 if (!$rootScope.viuuCrtActivitate) {
                       ref[ref.length-1].numeUser=' - Alege o activitate'
                       ref[ref.length-1].bifat=false 
                 }
                
        }
            ,cladescLocatiiDatele=function(){
                   locu.arrLocUser.forEach(function(e){
                         $scope.arrViuuData.locatii.push({numeUser:e
                                                          ,tip:'element'
                                                          ,nume:e
                                                        })
                   })
         
            } 
            ,cladescActivitatiDatele=function(cl){
                locu.crtLoc=cl
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

                cladescArrAT()
                locu.adaugGrupAT([0,1,3,4,5,6,7,8,9,10],'iesiri - Catre')
                locu.adaugGrupAT([11,12,14,15,16,17,18,19,20,21],'intrari - Dela')
                locu.cladescOAT()
                locu.cladescArrViuuItems()
            }
           
            cladescLocatii()
            cladescMeniuDatele()
            cladescLocatiiDatele()
            cladescActivitatiDatele($rootScope.viuuCrtLoc)
       
        $scope.arrViuuData.activitati=locu.arrItems
        $rootScope.viuuCrtLoc=locu.crtLoc
       
        
        
        
        $scope.apasElmMeniu=function(i,elm){
            switch (elm.grup) {
                case 'locatii':
                    $scope.viuuVizibil.locatii=true
                    $scope.viuuVizibil.meniu=false
                    $scope.viuuVizibil.activitati=false
                break;
                case 'activitati':
                    $scope.viuuVizibil.activitati=true
                    $scope.viuuVizibil.meniu=false
                    if (!primuViuuActivitati) $rootScope.comutaVizibil('fvi')
                    primuViuuActivitati=false
                break;
            }
        }
        $scope.apasElmAT=function(i,elm){
           switch (elm.clasa) {
                case 'titluGrup':
                    $scope.comutaGrup(i)
                break;
                case 'elmList':
                    if (!elm.codT) locu.setCodTransfer(elm)
                    $rootScope.setVizibil('fvi')
                    $rootScope.viuuCrtActivitate=elm.numeUser
                    cladescMeniuDatele()
                    $scope.viuuVizibil.activitati=false
                case 'elmGrup':
                    var y
                break;
            }
        }
        $scope.apasElmLoc=function(i,elm){
            $rootScope.viuuCrtLoc=elm.nume
            cladescMeniuDatele()
            $scope.viuuVizibil.locatii=false
            if ($rootScope.viuuCrtActivitate) {
                        $rootScope.setVizibil('fvi')
            } else $scope.viuuVizibil.meniu=true
            
        }
        
        $scope.apasPlus=function(){
            $scope.arrData.viuu.unshift({nume:$scope.mLocatii
                                         ,mGrup:'locatii'
                                         ,vizibil:true
                                         ,tip:'element'
                                        })
            $scope.mLocatii=''   
            $scope.viuuVizibil.adaugLocatii=false
         }
        $scope.apasButonMeniu=function(){
             $scope.viuuVizibil.meniu=!$scope.viuuVizibil.meniu
         }
        
        $scope.inputLocatii=function(){
            var arr=$filter('filter')($scope.arrViuuData.locatii,$scope.mLocatii)
            if (arr.length==0) $scope.viuuVizibil.adaugLocatii=true
                        else $scope.viuuVizibil.adaugLocatii=false
         }
        $scope.comutaGrup=function(i){
            
            var eRef=$scope.arrViuuData.activitati
             i++ 
            while (eRef[i].clasa=='elmGrup' && i<eRef.length) {
                eRef[i].invizibil=!eRef[i].invizibil
                i++
            }
        }
       
        
      
      var setKey_ViuuData=function(vd,kC,vC,k,v){
                  $scope.arrViuuData[vd].forEach(
                      function(e){ if (e[kC]==vC) e[k]=v}
                  )
          }
      setKey_ViuuData('activitati','clasa','elmGrup','invizibil','true')
      setKey_ViuuData('activitati','clasa','titluGrup','semnGrup','true')
      
      
    }) //end controller 'meniuPctrl'
    
    app.controller('itemPage',function($rootScope,$scope){
        var arrTitlu=['culoare','masura','cod','idxC']//$rootScope.arrMultiValKey
        var crtGrup=arrTitlu[0]
            ,arrOrdAfis=arr0123(arrTitlu.length)
          
            //,ao=$scope.aoViuuIP
       
        $scope.arataPage=false
        $scope.numeElm
        var v1
            //,oMvkAvd=$scope.oMultiValKeyAVD
            /*,init_oMvkAvd=function(){
                arrOrdAfis.forEach(function(e){
                    oMvkAvd[arrTitlu[e]]=[]
                })
            }*/
            ,fold=function(deschis){
                if (deschis) return  'glyphicon glyphicon-menu-down'
                        else return 'glyphicon glyphicon-menu-right'
            }
            ,cladescAoViuuIP=function(activK){
                 $scope.aoViuuIP=[]
                var itr=-1 ,arrValF=[] ,deschis
                arrOrdAfis.forEach(function(e){
                    if (activK==arrTitlu[e]) deschis=true
                                        else deschis=false
                    itr++
                    $scope.aoViuuIP[itr]={numeUser:arrTitlu[e]
                                          //,deschis:deschis
                                          ,titlu:true
                                          ,semnFold:fold(deschis)
                                          ,tip:'titlu'
                                         }
                    if (deschis) {
                        arrValF=$rootScope.fTab.obtAvd(activK)
                        arrValF.forEach(function(e){
                            itr++
                            $scope.aoViuuIP[itr]={numeUser:e
                                                  ,grup:activK
                                                  ,tip:'element'
                                                  //,deschis:deschis
                                                 }
                        })
                    }
                })
            }
        $rootScope.initIP=function(elm){
           $scope.numeElm=elm
           cladescAoViuuIP(arrTitlu[0]) 
           $scope.arataPage=true
        }
        $scope.apasElm=function(elm){
           
            if (elm.titlu) cladescAoViuuIP(elm.numeUser)
        }
        
       /*  angular.forEach(oMvkAvd
                            ,function(v,k){
                
                            },orez)
        */     
    })
  
 

    
    app.filter('paginare', function(){
                                return function(input, start) {
                                          //  start = parseInt(start, 10);
                                            return input.slice(start);
                                        };
                            });
  


/*  
    $scope.crtUnuViuu=''
         var unuVizibil=function(numeViuu){
            $scope.viuuVizibil['crtUnuViuu']=!$scope.viuuVizibil['crtUnuViuu']
            $scope.crtUnuViuu=numeViuu
            $scope.viuuVizibil['crtUnuViuu']=true
         }
*/
/*
    app.controller('meniuPctrl_vch1',function($scope,$filter){
         $scope.arrData={menuItems:[]
                         ,viuu:[]
                        }
         $scope.viuuVizibil={locatii:false
                         ,activitati:false
                         ,meniu:false
                         ,adaugLocatii:false
                         ,inpLocatii:true
             
         }
         $scope.titluViuu=''
         $scope.oCrtLocatie={}
        
         var adaugMenuItems=function(oElm){
              $scope.arrData.menuItems.push(oElm)
         }
         adaugMenuItems({nume:'Locatie curenta :'
              ,vizibil:true
              ,tip:'titlu'
              ,mGrup:'locatii'
             })
         adaugMenuItems({nume:'default-location'
              ,vizibil:true
              ,tip:'element'
              ,mGrup:'locatii'
              ,bifat:true     
             })
         $scope.arrData.viuu.push({nume:'musteriu'
             ,mGrup:'locatii'
             ,vizibil:true
             ,tip:'element'
            })
         $scope.arrData.viuu.push({nume:'furnizor'
             ,mGrup:'locatii'
             ,vizibil:true
             ,tip:'element'
            })
         
        
         var actiuneElemMeniu=function(oRef){
             switch (oRef.mGrup) {
                 case '':
                 break;
             }
         }
         var elmMeniuApasat=function(oRef){
             switch (oRef.tip) {
                 case 'element':
                     $scope.viuuVizibil.locatii=true
                     $scope.viuuVizibil.meniu=false
                     $scope.titluViuu='Locatiunile'
                 break;
             }
         }
         $scope.apasItemMenu=function(i,n){
             switch ($scope.arrData.menuItems[i].mGrup) {
                case 'locatii':
                     elmMeniuApasat($scope.arrData.menuItems[i])
                break;
             }
         }
         $scope.apasElmViuu=function(i,n){
             switch ($scope.arrData.viuu[i].mGrup) {
                case 'locatii':
                     elmLocatiiApasat(i,$scope.arrData.viuu[i])
                break;
             }
         }
       
         var elmLocatiiApasat=function(i,oRef){
             switch (oRef.tip){
                 case 'element':
                            
                     $scope.oCrtLocatie=oRef
                     adaugMenuItems({nume:oRef.nume
                                     ,tip:'element'
                                     ,vizibil:true
                                     ,bifat:true     
                                    })
                     $scope.viuuVizibil.locatii=false
                     $scope.viuuVizibil.meniu=true
                     
                 break;
                     
                  case 'folder':
                 break;
             }
         }
         $scope.apasButonMeniu=function(){
             $scope.viuuVizibil.meniu=!$scope.viuuVizibil.meniu
         }
         $scope.apasPlus=function(){
            $scope.arrData.viuu.unshift({nume:$scope.mLocatii
                                         ,mGrup:'locatii'
                                         ,vizibil:true
                                         ,tip:'element'
                                        })
            $scope.mLocatii=''   
            $scope.viuuVizibil.adaugLocatii=false
         }
         $scope.inputLocatii=function(){
            var arr=$filter('filter')($scope.arrData.viuu,$scope.mLocatii)
            if (arr.length==0) $scope.viuuVizibil.adaugLocatii=true
                        else $scope.viuuVizibil.adaugLocatii=false
         }
  
     })
    app.controller('meniuPctrl_vch2',function($scope){
        $scope.itemsMeniu=[]
        var arrTitluri=['Locations','Activities','Transfer']
        $scope.itemsMeniu.push({
                      tip:'titlu'
                      ,nume:arrTitluri[0]
                      ,cracanabil:true
                      ,cracanat:true
                      //,semnComutare:true
                      ,vizibil:true
                     })
        arrLocatii.forEach(function(e,i,a){
            $scope.itemsMeniu.push({tip:'element'
                                   ,mGrup:'locatii'
                                   ,nume:e
                                   ,cracanabil:false
                                   ,vizibil:true
                                   })
        })
        $scope.itemsMeniu.push({
                      tip:'titlu'
                      ,nume:arrTitluri[1]
                      ,cracanabil:true
                      //,semnComutare:true
                      ,cracanat:false
                      ,vizibil:true
                     })
        var contoar=0
            ,sfc='glyphicon glyphicon-chevron-right'
        arrActivities.forEach(function(e,i,a){
            
            var o={mGrup:'activitati'
                   ,nume:e
                   ,vizibil:false
                   }
            o['tip']=arrTipElmActivities[contoar]
            if (o.tip=='folderu'){ 
                                    o['semnF']=true
                                    o['semnFcomutator']=sfc
                                 }
           
            $scope.itemsMeniu.push(o)
            contoar++
        })
     
       
        var comutaVizibil=function(i){
            if ($scope.itemsMeniu[i].cracanabil){
                        i++
                         while ((i<$scope.itemsMeniu.length) && ($scope.itemsMeniu[i].tip!='titlu')){
                                    $scope.itemsMeniu[i].vizibil=!$scope.itemsMeniu[i].vizibil
                                    i++
                         }}
           // return oRef.vizibil
        }
        $scope.titluInchide=function(i){
            
                        i++
                         while ((i<$scope.itemsMeniu.length) && ($scope.itemsMeniu[i].tip!='titlu')){
                                    $scope.itemsMeniu[i].vizibil=false
                                    i++
                         }
        }
        $scope.titluDeschide=function(i){
            
                        i++
                         while ((i<$scope.itemsMeniu.length) && ($scope.itemsMeniu[i].tip!='titlu')){
                                if ($scope.itemsMeniu[i].tip!='elmFolder') {
                                    $scope.itemsMeniu[i].vizibil=true
                                }
                                i++
                         }
        }
        $scope
        $scope.apasItem=function(i,n){
             //comutaVizibil(i)
            var oRef=$scope.itemsMeniu[i]
            if (oRef.cracanabil){
                    if(oRef.cracanat) $scope.titluInchide(i)
                            else $scope.titluDeschide(i)
                    oRef.cracanat=!oRef.cracanat
            }
            if (oRef.tip=='folderu'){
                i++
                while ((i<$scope.itemsMeniu.length) && ($scope.itemsMeniu[i].tip=='elmFolder')){
                  $scope.itemsMeniu[i].vizibil=! $scope.itemsMeniu[i].vizibil 
                  i++
                }
            }
            
         
        }
    })
    app.controller('setViuuCtrl',function($scope){
        var crtViuuNume
            ,viuuList=[]
        $scope.setViuu=function(){
            
        }
        var adaugViuu=function(){
            
        }
    })
*/
/*
    var cladescMeniuDatele_faraLoc=function(){
                var ref=$scope.arrViuuData.meniu
                    ,faraLoc
                ref.push({numeUser:'L o c a t i e :'
                          ,clasa:'titlu'
                         })
                if (!$rootScope.viuuCrtLoc)  {$rootScope.viuuCrtLoc='Alege o locatie'
                                         faraLoc=true}
                ref.push({numeUser:$rootScope.viuuCrtLoc
                          ,clasa:'element'
                          ,bifat:true
                          ,grup:'locatii'
                        })
                if (!faraLoc){
                    if (!$rootScope.viuuCrtActivitate)  $rootScope.viuuCrtActivitate='Alege o activitate'
                    ref.push({numeUser:'Activitate transfer :'
                              ,clasa:'titlu'
                             }
                             ,{numeUser:$rootScope.viuuCrtActivitate
                               ,clasa:'element'
                               ,bifat:true
                               ,grup:'activitati'
                             })
                }
        }
*/



 
     