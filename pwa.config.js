exports.webpack = function(config, env) {
	if (env.production) {
		// config.devtool = false
		config.module.rules.forEach(rule => {
			if (rule.hasOwnProperty('use') && Array.isArray(rule.use)) {
				rule.use.forEach(use => {
					if (use.hasOwnProperty('options')) {
						use.options.sourceMap = false
					}
				})
			}
		})
	}
}
