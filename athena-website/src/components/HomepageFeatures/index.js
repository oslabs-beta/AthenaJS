import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Edit/Develop Components With Live Rendering',
    img: '../../static/img/athenaFull_transparent.jpg',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        AthenaJS lets users to either edit currently existing components from your
        project or develop new components for use in your project. 
      </>
    ),
  },
  {
    title: 'Build UI Screenshots from Saved Component Library',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        AthenaJS allows users to save their newly edited/created components to a component library
        which can then be used to create mock UI images from their saved components.
      </>
    ),
  },
  {
    title: 'Easily Export Created/Updated Components back to Project',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>


        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
