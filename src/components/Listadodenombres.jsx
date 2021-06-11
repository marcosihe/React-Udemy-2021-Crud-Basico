import React, {useState} from 'react';
import uniqid from 'uniqid';

export const Listadodenombres = () => {
    const [nombre, setNombre] = useState('');
    const [listaNombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const agregarNombre = (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            setError("El campo está vacío");
            return false;
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([...listaNombres, nuevoNombre]);
        setNombre('');
        setError(null);
    }

    const borrarNombre = id => {
        const nuevoArray = listaNombres.filter( item => item.id !== id);
        setListaNombres(nuevoArray);
    }

    const editar = item => {
        setModoEdicion(true);
        setNombre(item.tituloNombre);
        setId(item.id);
    }

    const editarNombre = evento => {
        evento.preventDefault();
        const nuevoArray = listaNombres
        .map( item => item.id === id ? {id:id, tituloNombre:nombre} : item);
        setListaNombres(nuevoArray);
        setModoEdicion(false);
        setNombre('');
    }

    return (
        <div>
            <h2 className="text-center">Aplicación CRUD-BÁSICA</h2>
            <div className="row">
                <div className="col">
                <h2>Listado de nombres</h2>
                <ul className="list-group">
                    {
                        listaNombres.map( item => 
                            <li key="{item.id}" className="list-group-item">
                                {item.tituloNombre}
                                <button 
                                className="btn btn-danger float-end"
                                onClick={ () => borrarNombre(item.id)}
                                >
                                    Borrar
                                </button>
                                <button 
                                className="btn btn-warning float-end me-md-2"
                                onClick={ () => editar(item)}
                                >
                                    Editar
                                </button>
                            </li>)
                    }
                </ul>
                </div>
                <div className="col d-grid gap-3">
                    <h2>Formulario para agregar nombres</h2>
                    <form onSubmit={modoEdicion ? editarNombre : agregarNombre} className="form-group">
                        <input 
                        onChange={e => setNombre(e.target.value)} 
                        type="text" className="form-control mb-3" 
                        placeholder="Ingresar nombre" 
                        value={nombre}
                        />
                        <input 
                        type="submit" 
                        className="form-control btn btn-success" 
                        value={modoEdicion ? "Actualizar nombre" : "Registrar nombre"}
                        />
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ):
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}