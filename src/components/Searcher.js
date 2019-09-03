import React, {useState} from 'react';
import Error from './Error';


const Searcher = ({setSearch}) => {
    
    const [termSearch, setTermSearch] = useState('');
    const [error, setError] = useState(false);

    const searchImage = e => {
        e.preventDefault();

        //validar
        if(termSearch === '') {
            setError(true);
            return;
        }

        //Enviar el termino hacia el componente principal
        setError(false);
        setSearch(termSearch);

    }
    
    return ( 
        <form
            onSubmit = {searchImage}
        >
            <div className = "row">
                <div className = "form-group col-md-8">
                    <input 
                        type = "text"
                        className = "form-control form-control-lg"
                        placeholder = "Search a pic, example: coffee, soccer..."
                        onChange = {e => setTermSearch(e.target.value)}
                    />
                </div>
                <div className = "form-group col-md-4">
                    <input 
                        type = "submit"
                        className = "btn btn-lg btn-danger btn-block"
                        value = "Let's Go!"
                    />
                </div>
            </div>

                { (error) ? <Error message = "Please fill the field" /> : null }

        </form>
     );
}
 
export default Searcher;