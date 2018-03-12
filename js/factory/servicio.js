angular.module("app", [])
		.factory("descargasFactory", function(){
		    
		    var interfaz = {
		        recuperar: "",
		        recuperarConvertir: [],
		        id:0,
		        arrayCompartido:[],
		        local:[],
		        obtenerLocalStorage: function(){
		        	if(localStorage.getItem('local')===null){
		        		/*hago un if para preguntar si el localStore con el key local
		        		ya existe o no, si no existe lo creo guardandole un array vacio*/
		        		localStorage.setItem('local', JSON.stringify(this.local));
		        	}
		        	else{
		        		/* obtengo los datos del local store*/
		        		this.recuperar = localStorage.getItem('local');
		        	    /* parseo los datos obtenidos y los guardo en una propiedad
		        	    que retorno, esta propiedad luego la iterare en la vista*/
		        		return this.recuperarConvertir = JSON.parse(this.recuperar);   
		        		}
		        },
		        guardar: function(name,ape,course){
		        	if(localStorage.getItem('local')===null){
		        		this.local=[]
		        	}
		        	else{
		        		/* obtengo los datos del localStore*/
		        	this.recuperar = localStorage.getItem('local');
		        	 /* parseo los datos obtenidos*/
		        	this.recuperarConvertir = JSON.parse(this.recuperar);
		        	/*guardo objeto en array, valores dinamicos con ng-model
		        	que fueron recibidos por parametros a este metodo*/
					this.recuperarConvertir.push({
						nombre:name,
						apellido:ape,
						curso:course
					});
					/* una vez que el objeto esta agregado en el array,
					vuelvo a convertir a string el array y lo guardo 
					en el localStore*/
				    localStorage.setItem('local', JSON.stringify(this.recuperarConvertir));
		        	}
		        },
		        eliminar:function(index){
					this.id = index;
					/* obtengo los datos del localStore*/
		        	this.recuperar = localStorage.getItem('local');
		        	 /* parseo los datos obtenidos */
		        	this.recuperarConvertir = JSON.parse(this.recuperar);
					this.recuperarConvertir.splice(this.id,1);
					localStorage.setItem('local', JSON.stringify(this.recuperarConvertir));
				  },
				guardarModificacion:function(objeto,cuatro){
					/* obtengo los datos del local store*/
		        	this.recuperar = localStorage.getItem('local');
		        	 /* parseo los datos obtenidos */
		        	this.recuperarConvertir = JSON.parse(this.recuperar);
		        	/*utiliso un metodo de array de javascript para modificar un 
		        	valor en un array, los valores obtenidos por parametros*/
					this.recuperarConvertir.splice(cuatro,1,objeto);
					localStorage.setItem('local', JSON.stringify(this.recuperarConvertir));
				}
		    }
		    return interfaz;
		})

		