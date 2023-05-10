export const CustomerService = {
    getData() {
      return [
        {
          id: 1,
          name: 'Process Description',
          representative: {
            name: 'edit',
          },
        },
        {
          id: 2,
          name: 'Process Description',
          representative: {
            name: 'edit',
          },
        },
        {
          id: 3,
          name: 'Process Description',
          representative: {
            name: 'edit',
          },
        },
        {
          id: 4,
          name: 'Process Description',
          representative: {
            name: 'edit',
          },
        },
        {
          id: 1,
          name: 'Process Description',
          representative: {
            name: 'view',
          },
        },
        {
          id: 2,
          name: 'Process Description',
          representative: {
            name: 'view',
          },
        },
        {
          id: 1,
          name: 'Process Description',
          representative: {
            name: 'mamage',
          },
        },
      ];
    },
  
    getCustomersSmall() {
      return Promise.resolve(this.getData().slice(0, 10));
    },
  
    getCustomersMedium() {
      return Promise.resolve(this.getData().slice(0, 50));
    },
  
    getCustomersLarge() {
      return Promise.resolve(this.getData().slice(0, 200));
    },
  
    getCustomersXLarge() {
      return Promise.resolve(this.getData());
    },
  
    getCustomers(params) {
      const queryParams = params
        ? Object.keys(params)
            .map(
              (k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
            )
            .join('&')
        : '';
  
      return fetch(
        'https://www.primefaces.org/data/customers?' + queryParams
      ).then((res) => res.json());
    },
  };
  