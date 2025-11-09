const config = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
    ],
    // This ensures the automatic JSX transform is used
    assumptions: {
        setPublicClassFields: true,
    },
};

module.exports = config;
