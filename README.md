# beru
Prototype/PoC of a carbon accounting & management system aimed towards manufacturing companies with complex supply chains. It focuses on product-level carbon footprint measurement & optimization and is based on the [E-liability accounting](https://e-liability.institute/) method.

![Screeenshot of the landing page](/screenshots/landing.png)

## Built with
![Sveltekit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Features
### Component-level footprint analysis
![Screenshot of dashboard](/screenshots/dashboard.png)

Beru aims to facilitate accurate masurement of a product's complete carbon footprint, which is the accumulation of its components' footprints. This enables manufacturers to understand their products better and find ways to reduce their carbon footprints.

### E-liability accounting
![Screenshot of e-liability statement](/screenshots/eliability.png)

E-liability accounting is a carbon accounting approach developed by Robert Kaplan & Karthik Ramanna that allows organizations to develop accurate & auditable carbon reports. This prototype aims to explore the feasibility of this approach. Next steps include to implement it using a blockchain platform such as Hyperledger Sawtooth, which would produce transparent and auditable records of transactions.


### Footprint optimization
![Screenshot of optimiziation page](/screenshots/optimize.png)

Beru provides an experimental dashboard to allow manufacturers to test different combinations of alternative materials or suppliers and see the impacts they have on the price and carbon footprint of a product. One idea in mind for this feature is to create a ML model to find the optimal combination of materials/suppliers that results in the lowest footprint with the lowest increase in manufacturing cost.


## Developing
Instructions to build the project from source.
```bash
# clone this repository
git clone https://github.com/rmrt1n/beru && cd beru

# install dependencies
pnpm i

# run dev server
pnpm dev
```

## License
Distributed under the MIT License. See [LICENSE](/LICENSE) for more information.

