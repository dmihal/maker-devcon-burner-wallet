const {
  override,
  removeModuleScopePlugin,
  babelInclude,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  babelInclude([
    path.resolve("src"),
    path.resolve("../burner-ui"),
    path.resolve("../exchange"),
    path.resolve("../plugins"),
    path.resolve("../ching-plugin"),
    path.resolve("../collectable-plugin"),
    path.resolve("../sablier"),
  ]),
);
