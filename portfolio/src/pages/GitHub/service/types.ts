export type RepoType = {
  name: string;
  description: string;
  href: string;
  stars: number;
  forks: number;
  issues: number;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  website: string | undefined;
  owner: {
    name: string;
    image: string;
    href: string;
    type: string;
  };
  size: number;
  languages: {
    [key: string]: number;
  };
};

export const LanguageColorMap: { [key: string]: string } = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Scala: '#c22d40',
  'Objective-C': '#438eff',
  Vue: '#2c3e50',
  Dart: '#00B4AB',
  Perl: '#0298c3',
  CoffeeScript: '#244776',
  Haskell: '#5e5086',
  Lua: '#000080',
  Clojure: '#db5855',
  Elixir: '#6e4a7e',
  Erlang: '#B83998',
  Julia: '#a270ba',
  TeX: '#3D6117',
  Groovy: '#e69f56',
  'Visual Basic': '#945db7',
  'Objective-C++': '#6866fb',
  R: '#198CE7',
  'Jupyter Notebook': '#DA5B0B',
  CMake: '#DA3434',
  PowerShell: '#012456',
  'F#': '#b845fc',
  Jinja: '#a52a22',
};
