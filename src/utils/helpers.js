const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
});

//Price formatter
export const handlePrice = (prodprice) => {
    const price = formatter.format(prodprice);
    return price;
}