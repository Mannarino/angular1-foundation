
/*---------Modulo principal-------------*/
var world=angular.module("consigna",["app"]);
 
/*---------controlador-------------*/

	world.controller('usuarios',['$scope','descargasFactory',
		function($scope,descargasFactory){
                	 
			    	
                /* esta funcion llama a un metodo de un servicio para que guarde los datos en el localstore,
                primero le pasa por parametros los valores recogidos de la vista con el ng-model*/
				$scope.save=function(){
					var name = $scope.recojo.nombre;
					var ape = $scope.recojo.apellido;
					var course = $scope.recojo.curso;
					descargasFactory.guardar(name,ape,course);
					/* vuelvo a llamar el metodo obtenerlocalstore,y guardo
					en las variables que se iteran en la vista
					para que se recargue la pagina*/
					$scope.listaCompleta = descargasFactory.obtenerLocalStorage();
					$scope.recienteUsuario = descargasFactory.obtenerLocalStorage();
					/*limpio los input*/
					clearInputs();
				  }	
				$scope.getClearInputs=function(){
				  	clearInputs();
				  }
				  /* funcion con codigo para que se limpien los input, la llamare varias veces*/
				function clearInputs(){
				  	$scope.recojo.nombre="";
					$scope.recojo.apellido="";
					$scope.recojo.curso="";
				  }
				  /* estas dos variables obtendran la info del localstore y  se iteraran en la vista con la
			        informacion recuperada del localstore que ya fue parseada*/
				$scope.listaCompleta = descargasFactory.obtenerLocalStorage();
				$scope.recienteUsuario = descargasFactory.obtenerLocalStorage();

				$scope.delete=function(index){
					/*llamo a un metodo del servicio que hara la eliminacion del local store, le paso
					como parametro el numero del id del usuario a eliminar*/
					descargasFactory.eliminar(index);
					/*capturo los datos del usuario a eliminar para mostrarlos en el modalde notificacion */
					$scope.nombreEliminado=$scope.listaCompleta[index].nombre;
					$scope.apellidoEliminado=$scope.listaCompleta[index].apellido;
					$scope.cursoEliminado=$scope.listaCompleta[index].curso;
					/*acualizo nuevos valores en las variables que se iteran en la vista*/
					$scope.listaCompleta = descargasFactory.obtenerLocalStorage();
					$scope.recienteUsuario = descargasFactory.obtenerLocalStorage();
					/* esta ultima linea lanza un modal de foundation*/
					$('#myModal').foundation('reveal', 'open');
				  }	


				  /*funciones del modificar*/
				$scope.openModalChange=function(valor1,valor2,valor3,valor4){
					/*esta funcion carga en el modal de modificacion,los valores del usuario elegido
					para ser modificado*/
					$scope.modificarNombre=valor1;
                	$scope.modificarApellido=valor2;
                	$scope.modificarCurso=valor3; 
                	$scope.variableConIndex=valor4;  
			        }
			    $scope.saveChange=function(name,apellido,curso,id){
			    	var objetoC={
			    		nombre:name,
			    		apellido:apellido,
			    		curso:curso
			    	}
                	descargasFactory.guardarModificacion(objetoC,id);  
                	
                	$scope.listaCompleta = descargasFactory.obtenerLocalStorage();
					$scope.recienteUsuario = descargasFactory.obtenerLocalStorage();

					$('#firstModal').foundation('reveal', 'close');
					$('#secondModal').foundation('reveal', 'open');
			        }
			      
			}

	]);

	