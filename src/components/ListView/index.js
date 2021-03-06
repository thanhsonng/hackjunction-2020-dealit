import React, { useState, useEffect } from 'react';
import { getListProducts } from 'utils/request.mock';
import svgBackground from 'assets/svgs/background.svg';
import { ReactComponent as PlusButtonSvg } from 'assets/svgs/plus-button-purple.svg';
import Button from 'components/Shared/Button';
import Header from './Header';
import SuggestionSlideup from './SuggestionSlideup';
import ListProduct from './ListProduct';
import VariantSlideup from './VariantSlideup';

function ListView({ setView }) {
  const [showSuggestionSlideup, setShowSuggestionSlideup] = useState(false);
  const [showVariantSlideup, setShowVariantSlideup] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [varyingListProduct, setVaryingListProduct] = useState(null);

  useEffect(() => {
    const request = async () => {
      const lps = await getListProducts();
      setListProducts(lps);
    };

    request();
  }, []);

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundImage: `url(${svgBackground})` }}
    >
      <Header />

      <div className="bg-pearl rounded-t-4xl flex-1 px-4 py-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <span className="font-bold text-xl mr-3">
              I&apos;m in need of ...
            </span>
            <button
              type="button"
              onClick={() => setShowSuggestionSlideup(true)}
              className="bg-purple rounded-full w-8 h-8 inline-flex justify-center items-center shadow-real"
            >
              <PlusButtonSvg />
            </button>
          </div>

          <div className="mt-6">
            {listProducts.map((listProduct) => (
              <ListProduct
                key={listProduct.id}
                listProduct={listProduct}
                setVaryingListProduct={setVaryingListProduct}
                openVariantSlideup={() => setShowVariantSlideup(true)}
              />
            ))}
          </div>
        </div>

        <Button onClick={() => setView('match')}>Find my deals</Button>

        {showSuggestionSlideup && (
          <SuggestionSlideup
            closeSlideup={() => setShowSuggestionSlideup(false)}
            setListProducts={setListProducts}
          />
        )}

        {showVariantSlideup && (
          <VariantSlideup
            closeSlideup={() => setShowVariantSlideup(false)}
            listProduct={varyingListProduct}
            setListProducts={setListProducts}
          />
        )}
      </div>
    </div>
  );
}

export default ListView;
