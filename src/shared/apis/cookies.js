/*	:: cookies.js :: Slightly edited by kipid at 2024-10-08.
|*|
|*|	A complete cookies reader/writer framework with full unicode support.
|*|
|*|	https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|	This framework is released under the GNU Public License, version 3 or later.
|*|	http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|	Syntaxes:
|*|	* docCookies.setItem(name, value[, end[, path[, domain[, secure]]]]) // end :: Number: max-age in seconds
|*|	* docCookies.getItem(name)
|*|	* docCookies.removeItem(name[, path], domain)
|*|	* docCookies.hasItem(name)
|*|	* docCookies.keys()
	*/
export const expire = 365 * 24 * 60 * 60;
// max-age in seconds.
const docCookies = {
	hasItem(sKey) {
		return new RegExp(`(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`).test(document.cookie);
	},
	getItem(sKey) {
		return (
			decodeURIComponent(
				document.cookie.replace(
					new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`),
					'$1',
				),
			) || null
		);
	},
	removeItem(sKey, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
			return false;
		}
		document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
			sDomain ? `; domain=${sDomain}` : ''
		}${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;
		return true;
	},
	setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
			return false;
		}
		let sExpires;
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
					break;
				case String:
					sExpires = `; expires=${vEnd}`;
					break;
				case Date:
					sExpires = `; expires=${vEnd.toUTCString()}`;
					break;
				default:
					sExpires = '';
			}
		}
		document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${
			sDomain ? `; domain=${sDomain}` : ''
		}${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;
		return true;
	},
	keys() {
		const aKeys = document.cookie.replace(/(?:^|;)\s*([^=]+)=/g, '').split(/\s*(?:=[^;]*)?;\s*/);
		// for (let nIdx=0;nIdx<aKeys.length;nIdx++) { aKeys[nIdx]=decodeURIComponent(aKeys[nIdx]); }
		return aKeys;
	},
};

export default docCookies;
