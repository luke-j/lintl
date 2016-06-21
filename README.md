# Lintl

Lintl is a UI to help generate static analysis config files. Checkout the site [here](https://lintl.co).

![jshint varstmt-1](https://cloud.githubusercontent.com/assets/6657011/16218033/d234a932-37bc-11e6-95cc-31843baefd04.png)
![jshint results](https://cloud.githubusercontent.com/assets/6657011/16218043/e6278414-37bc-11e6-9417-750b7cb200f5.png)

## Contributing

If you want to add another static analysis engine, your file structure must follow this pattern:

````
lintl/
  └──public/
    └──definitions/ 
      └──engineName/
        ├──environments.json
        └──rules.json
````

Your ``environments.json`` and ``rules.json`` must follow the same structure as the current files under the ``definitions`` directory.

Run ``npm run dev`` and go to ``localhost:8080`` for a development version of Lintl.
 
 Finally, once you've made any changes, submit a pull request.

## Found an error?

If you've found an error in any descriptions/code samples or in the produced config files, post an issue on the repository.

## License

MIT License

Copyright (c) 2016 Luke Jones