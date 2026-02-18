export default {
  source: ["assets/tokens.json"],

  hooks: {
    formats: {
      'css-with-wildcard': ({ dictionary, options }) => {
        const selector = options.selector || ':root';

        // Generate variables from all tokens EXCEPT the wildcard one
        const tokenVars = dictionary.allTokens
          .map(token => {
            if (token.path[1] === '*') {
              return `  --${token.path[0]}-*: ${token.$value};`;
            } else {
              const val = token.$value;
              return `  --${token.name}: ${val};`;
            }
          })
          .join('\n');


        return `${selector} {\n${tokenVars}\n}`;
      }
    }
  },

  platforms: {
    css: {
      transformGroup: 'css',
      files: [
        {
          destination: 'vars.css',
          // Replaced built‑in "css/variables" with a custom format because the default naming transform
          // strips '*' from token names. This custom format preserves the asterisk.
          format: 'css-with-wildcard',
          options: { selector: '@theme' }
        }
      ]
    }
  }
}