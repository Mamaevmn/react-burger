import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ingredients.module.css';

import IngredientDetails from '../../components/modal-ingredient-details/modal-ingredient-details';
import { getData } from '../../utils/api';

function Ingredients() {
    const { id } = useParams();
    const [ingredient, setIngredient] = useState(null);

    const loadIngredients = useCallback(() => {
        getData().then(data => setIngredient(data.data.find(item => item._id === id)));
    }, [id]);
    
    useEffect(() => {
        loadIngredients();
    }, [id, loadIngredients]);
        
    return (
        <section className={styles.wrapper}>
            { ingredient && <IngredientDetails {...ingredient}/> }
        </section>
    )
}

export default Ingredients