    var dd=angular.module('numeDrctve' ,[])
    
     dd.directive('fvitag' ,function(){ //filtre-valori-items(rezultate filtrare)
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/fvi.html'
        }
    })
     dd.directive('filtretag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/listFiltre.html'
        }
    })
     dd.directive('valoritag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/listvalori.html'
        }
    })
     dd.directive('rfitemstag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/listRFitems.html'
        }
    })
     
     dd.directive('continutmeniutag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/cmeniu.html'
        }
    })
     dd.directive('meniuprincipaltag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/meniup.html'
        }
    })
     dd.directive('bartitlutag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/bartitlu.html'
        }
    })
    
     dd.directive('locatiiviuutag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/viuuListSA.html'
        }
    })
     dd.directive('meniuviuutag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/viuuMeniu.html'
        }
     })
     dd.directive('activitativiuutag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/viuuAT.html'
        }
     })
     dd.directive('itempagetag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/itemPageViuu.html'
        }
     })
     dd.directive('vlistatag' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directivesHtml/vLista.html'
        }
     })
    