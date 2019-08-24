// import GAnalytics from 'ganalytics'
import { Notify } from '@codewithkyle/notifyjs'
import App from '@components/App'
import './index.scss'

window.app = new App({
	target: document.querySelector('#app'),
})

if (process.env.NODE_ENV === 'production') {
	// window.ga = new GAnalytics('UA-XXXXXXXX-X')

	// Service Worker registration
	const runtime = require('offline-plugin/runtime')
	runtime.install({
		onUpdateReady: () => {
			runtime.applyUpdate()
		},
		onUpdated: () => {
			new Notify({
				message: 'Update available!',
				duration: Infinity,
				actions: [
					{
						label: 'Refresh',
						value: 'refresh',
					},
					{
						label: 'Close',
						value: 'close',
					},
				],
				closeable: true,
				callback: value => value === 'refresh' && window.location.reload(),
			})
		},
	})
}
