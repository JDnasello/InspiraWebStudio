import '../css/section-2.css'
import { objectivesList } from '../data/objectives.js';

const Section2 = () => {
    return (
        <section className="seccion2" id='objectives'>
            <h1 className="background-h1">Inspira</h1>
            <h1 className='seccion2-title'>Nuestros Objetivos</h1>
            <div className="container-objectives">
                {
                    objectivesList.map(obj => (
                        <article className='objective-article' key={obj.id}>
                            <h2 className='objective-h2'>{obj.title}</h2>
                            <p className="objective-p">{obj.description}</p>
                        </article>
                    ))
                }
            </div>    
        </section>
    );
}

export default Section2
