'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_SOURCE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%235552e0' fill-opacity='1'%3E%3Cpath d='M24.37 16c.2.65.39 1.32.54 2H21.17l1.17 2.34.45.9-.24.11V28a5 5 0 0 1-2.23 8.94l-.02.06a8 8 0 0 1-7.75 6h-20a8 8 0 0 1-7.74-6l-.02-.06A5 5 0 0 1-17.45 28v-6.76l-.79-1.58-.44-.9.9-.44.63-.32H-20a23.01 23.01 0 0 1 44.37-2zm-36.82 2a1 1 0 0 0-.44.1l-3.1 1.56.89 1.79 1.31-.66a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .86.02l2.88-1.27a3 3 0 0 1 2.43 0l2.88 1.27a1 1 0 0 0 .85-.02l3.1-1.55-.89-1.79-1.42.71a3 3 0 0 1-2.56.06l-2.77-1.23a1 1 0 0 0-.4-.09h-.01a1 1 0 0 0-.4.09l-2.78 1.23a3 3 0 0 1-2.56-.06l-2.3-1.15a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1L.9 19.22a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01zm0-2h-4.9a21.01 21.01 0 0 1 39.61 0h-2.09l-.06-.13-.26.13h-32.31zm30.35 7.68l1.36-.68h1.3v2h-36v-1.15l.34-.17 1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0L2.26 23h2.59l1.36.68a3 3 0 0 0 2.56.06l1.67-.74h3.23l1.67.74a3 3 0 0 0 2.56-.06zM-13.82 27l16.37 4.91L18.93 27h-32.75zm-.63 2h.34l16.66 5 16.67-5h.33a3 3 0 1 1 0 6h-34a3 3 0 1 1 0-6zm1.35 8a6 6 0 0 0 5.65 4h20a6 6 0 0 0 5.66-4H-13.1z'/%3E%3Cpath id='path6_fill-copy' d='M284.37 16c.2.65.39 1.32.54 2H281.17l1.17 2.34.45.9-.24.11V28a5 5 0 0 1-2.23 8.94l-.02.06a8 8 0 0 1-7.75 6h-20a8 8 0 0 1-7.74-6l-.02-.06a5 5 0 0 1-2.24-8.94v-6.76l-.79-1.58-.44-.9.9-.44.63-.32H240a23.01 23.01 0 0 1 44.37-2zm-36.82 2a1 1 0 0 0-.44.1l-3.1 1.56.89 1.79 1.31-.66a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .9 0l2.21-1.1a3 3 0 0 1 2.69 0l2.2 1.1a1 1 0 0 0 .86.02l2.88-1.27a3 3 0 0 1 2.43 0l2.88 1.27a1 1 0 0 0 .85-.02l3.1-1.55-.89-1.79-1.42.71a3 3 0 0 1-2.56.06l-2.77-1.23a1 1 0 0 0-.4-.09h-.01a1 1 0 0 0-.4.09l-2.78 1.23a3 3 0 0 1-2.56-.06l-2.3-1.15a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01a1 1 0 0 0-.44.1l-2.21 1.11a3 3 0 0 1-2.69 0l-2.2-1.1a1 1 0 0 0-.45-.11h-.01zm0-2h-4.9a21.01 21.01 0 0 1 39.61 0h-2.09l-.06-.13-.26.13h-32.31zm30.35 7.68l1.36-.68h1.3v2h-36v-1.15l.34-.17 1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.69 0l1.36-.68h2.59l1.36.68a3 3 0 0 0 2.56.06l1.67-.74h3.23l1.67.74a3 3 0 0 0 2.56-.06zM246.18 27l16.37 4.91L278.93 27h-32.75zm-.63 2h.34l16.66 5 16.67-5h.33a3 3 0 1 1 0 6h-34a3 3 0 1 1 0-6zm1.35 8a6 6 0 0 0 5.65 4h20a6 6 0 0 0 5.66-4H246.9z'/%3E%3Cpath d='M159.5 21.02A9 9 0 0 0 151 15h-42a9 9 0 0 0-8.5 6.02 6 6 0 0 0 .02 11.96A8.99 8.99 0 0 0 109 45h42a9 9 0 0 0 8.48-12.02 6 6 0 0 0 .02-11.96zM151 17h-42a7 7 0 0 0-6.33 4h54.66a7 7 0 0 0-6.33-4zm-9.34 26a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-4.34a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-4.34a8.98 8.98 0 0 0 3.34-7h-2a7 7 0 0 1-7 7h-7a7 7 0 1 1 0-14h42a7 7 0 1 1 0 14h-9.34zM109 27a9 9 0 0 0-7.48 4H101a4 4 0 1 1 0-8h58a4 4 0 0 1 0 8h-.52a9 9 0 0 0-7.48-4h-42z'/%3E%3Cpath d='M39 115a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm6-8a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-3-29v-2h8v-6H40a4 4 0 0 0-4 4v10H22l-1.33 4-.67 2h2.19L26 130h26l3.81-40H58l-.67-2L56 84H42v-6zm-4-4v10h2V74h8v-2h-8a2 2 0 0 0-2 2zm2 12h14.56l.67 2H22.77l.67-2H40zm13.8 4H24.2l3.62 38h22.36l3.62-38z'/%3E%3Cpath d='M129 92h-6v4h-6v4h-6v14h-3l.24 2 3.76 32h36l3.76-32 .24-2h-3v-14h-6v-4h-6v-4h-8zm18 22v-12h-4v4h3v8h1zm-3 0v-6h-4v6h4zm-6 6v-16h-4v19.17c1.6-.7 2.97-1.8 4-3.17zm-6 3.8V100h-4v23.8a10.04 10.04 0 0 0 4 0zm-6-.63V104h-4v16a10.04 10.04 0 0 0 4 3.17zm-6-9.17v-6h-4v6h4zm-6 0v-8h3v-4h-4v12h1zm27-12v-4h-4v4h3v4h1v-4zm-6 0v-8h-4v4h3v4h1zm-6-4v-4h-4v8h1v-4h3zm-6 4v-4h-4v8h1v-4h3zm7 24a12 12 0 0 0 11.83-10h7.92l-3.53 30h-32.44l-3.53-30h7.92A12 12 0 0 0 130 126z'/%3E%3Cpath d='M212 86v2h-4v-2h4zm4 0h-2v2h2v-2zm-20 0v.1a5 5 0 0 0-.56 9.65l.06.25 1.12 4.48a2 2 0 0 0 1.94 1.52h.01l7.02 24.55a2 2 0 0 0 1.92 1.45h4.98a2 2 0 0 0 1.92-1.45l7.02-24.55a2 2 0 0 0 1.95-1.52L224.5 96l.06-.25a5 5 0 0 0-.56-9.65V86a14 14 0 0 0-28 0zm4 0h6v2h-9a3 3 0 1 0 0 6H223a3 3 0 1 0 0-6H220v-2h2a12 12 0 1 0-24 0h2zm-1.44 14l-1-4h24.88l-1 4h-22.88zm8.95 26l-6.86-24h18.7l-6.86 24h-4.98zM150 242a22 22 0 1 0 0-44 22 22 0 0 0 0 44zm24-22a24 24 0 1 1-48 0 24 24 0 0 1 48 0zm-28.38 17.73l2.04-.87a6 6 0 0 1 4.68 0l2.04.87a2 2 0 0 0 2.5-.82l1.14-1.9a6 6 0 0 1 3.79-2.75l2.15-.5a2 2 0 0 0 1.54-2.12l-.19-2.2a6 6 0 0 1 1.45-4.46l1.45-1.67a2 2 0 0 0 0-2.62l-1.45-1.67a6 6 0 0 1-1.45-4.46l.2-2.2a2 2 0 0 0-1.55-2.13l-2.15-.5a6 6 0 0 1-3.8-2.75l-1.13-1.9a2 2 0 0 0-2.5-.8l-2.04.86a6 6 0 0 1-4.68 0l-2.04-.87a2 2 0 0 0-2.5.82l-1.14 1.9a6 6 0 0 1-3.79 2.75l-2.15.5a2 2 0 0 0-1.54 2.12l.19 2.2a6 6 0 0 1-1.45 4.46l-1.45 1.67a2 2 0 0 0 0 2.62l1.45 1.67a6 6 0 0 1 1.45 4.46l-.2 2.2a2 2 0 0 0 1.55 2.13l2.15.5a6 6 0 0 1 3.8 2.75l1.13 1.9a2 2 0 0 0 2.5.8zm2.82.97a4 4 0 0 1 3.12 0l2.04.87a4 4 0 0 0 4.99-1.62l1.14-1.9a4 4 0 0 1 2.53-1.84l2.15-.5a4 4 0 0 0 3.09-4.24l-.2-2.2a4 4 0 0 1 .97-2.98l1.45-1.67a4 4 0 0 0 0-5.24l-1.45-1.67a4 4 0 0 1-.97-2.97l.2-2.2a4 4 0 0 0-3.09-4.25l-2.15-.5a4 4 0 0 1-2.53-1.84l-1.14-1.9a4 4 0 0 0-5-1.62l-2.03.87a4 4 0 0 1-3.12 0l-2.04-.87a4 4 0 0 0-4.99 1.62l-1.14 1.9a4 4 0 0 1-2.53 1.84l-2.15.5a4 4 0 0 0-3.09 4.24l.2 2.2a4 4 0 0 1-.97 2.98l-1.45 1.67a4 4 0 0 0 0 5.24l1.45 1.67a4 4 0 0 1 .97 2.97l-.2 2.2a4 4 0 0 0 3.09 4.25l2.15.5a4 4 0 0 1 2.53 1.84l1.14 1.9a4 4 0 0 0 5 1.62l2.03-.87zM152 207a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6 2a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-11 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-6 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3-5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-8 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5-2a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4-6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-4-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-5-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-24 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm16 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0zm86-29a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm19 9a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-14 5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-25 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm5 4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm9 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm15 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm12-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-11-14a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-19 0a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm6 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-25 15c0-.47.01-.94.03-1.4a5 5 0 0 1-1.7-8 3.99 3.99 0 0 1 1.88-5.18 5 5 0 0 1 3.4-6.22 3 3 0 0 1 1.46-1.05 5 5 0 0 1 7.76-3.27A30.86 30.86 0 0 1 246 184c6.79 0 13.06 2.18 18.17 5.88a5 5 0 0 1 7.76 3.27 3 3 0 0 1 1.47 1.05 5 5 0 0 1 3.4 6.22 4 4 0 0 1 1.87 5.18 4.98 4.98 0 0 1-1.7 8c.02.46.03.93.03 1.4v1h-62v-1zm.83-7.17a30.9 30.9 0 0 0-.62 3.57 3 3 0 0 1-.61-4.2c.37.28.78.49 1.23.63zm1.49-4.61c-.36.87-.68 1.76-.96 2.68a2 2 0 0 1-.21-3.71c.33.4.73.75 1.17 1.03zm2.32-4.54c-.54.86-1.03 1.76-1.49 2.68a3 3 0 0 1-.07-4.67 3 3 0 0 0 1.56 1.99zm1.14-1.7c.35-.5.72-.98 1.1-1.46a1 1 0 1 0-1.1 1.45zm5.34-5.77c-1.03.86-2 1.79-2.9 2.77a3 3 0 0 0-1.11-.77 3 3 0 0 1 4-2zm42.66 2.77c-.9-.98-1.87-1.9-2.9-2.77a3 3 0 0 1 4.01 2 3 3 0 0 0-1.1.77zm1.34 1.54c.38.48.75.96 1.1 1.45a1 1 0 1 0-1.1-1.45zm3.73 5.84c-.46-.92-.95-1.82-1.5-2.68a3 3 0 0 0 1.57-1.99 3 3 0 0 1-.07 4.67zm1.8 4.53c-.29-.9-.6-1.8-.97-2.67.44-.28.84-.63 1.17-1.03a2 2 0 0 1-.2 3.7zm1.14 5.51c-.14-1.21-.35-2.4-.62-3.57.45-.14.86-.35 1.23-.63a2.99 2.99 0 0 1-.6 4.2zM275 214a29 29 0 0 0-57.97 0h57.96zM72.33 198.12c-.21-.32-.34-.7-.34-1.12v-12h-2v12a4.01 4.01 0 0 0 7.09 2.54c.57-.69.91-1.57.91-2.54v-12h-2v12a1.99 1.99 0 0 1-2 2 2 2 0 0 1-1.66-.88zM75 176c.38 0 .74-.04 1.1-.12a4 4 0 0 0 6.19 2.4A13.94 13.94 0 0 1 84 185v24a6 6 0 0 1-6 6h-3v9a5 5 0 1 1-10 0v-9h-3a6 6 0 0 1-6-6v-24a14 14 0 0 1 14-14 5 5 0 0 0 5 5zm-17 15v12a1.99 1.99 0 0 0 1.22 1.84 2 2 0 0 0 2.44-.72c.21-.32.34-.7.34-1.12v-12h2v12a3.98 3.98 0 0 1-5.35 3.77 3.98 3.98 0 0 1-.65-.3V209a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-24c.01-1.53-.23-2.88-.72-4.17-.43.1-.87.16-1.28.17a6 6 0 0 1-5.2-3 7 7 0 0 1-6.47-4.88A12 12 0 0 0 58 185v6zm9 24v9a3 3 0 1 0 6 0v-9h-6z'/%3E%3Cpath d='M-17 191a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm19 9a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm-14 5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm-25 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm5 4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm9 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm15 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm12-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H4zm-11-14a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-19 0a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm6 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zm-25 15c0-.47.01-.94.03-1.4a5 5 0 0 1-1.7-8 3.99 3.99 0 0 1 1.88-5.18 5 5 0 0 1 3.4-6.22 3 3 0 0 1 1.46-1.05 5 5 0 0 1 7.76-3.27A30.86 30.86 0 0 1-14 184c6.79 0 13.06 2.18 18.17 5.88a5 5 0 0 1 7.76 3.27 3 3 0 0 1 1.47 1.05 5 5 0 0 1 3.4 6.22 4 4 0 0 1 1.87 5.18 4.98 4.98 0 0 1-1.7 8c.02.46.03.93.03 1.4v1h-62v-1zm.83-7.17a30.9 30.9 0 0 0-.62 3.57 3 3 0 0 1-.61-4.2c.37.28.78.49 1.23.63zm1.49-4.61c-.36.87-.68 1.76-.96 2.68a2 2 0 0 1-.21-3.71c.33.4.73.75 1.17 1.03zm2.32-4.54c-.54.86-1.03 1.76-1.49 2.68a3 3 0 0 1-.07-4.67 3 3 0 0 0 1.56 1.99zm1.14-1.7c.35-.5.72-.98 1.1-1.46a1 1 0 1 0-1.1 1.45zm5.34-5.77c-1.03.86-2 1.79-2.9 2.77a3 3 0 0 0-1.11-.77 3 3 0 0 1 4-2zm42.66 2.77c-.9-.98-1.87-1.9-2.9-2.77a3 3 0 0 1 4.01 2 3 3 0 0 0-1.1.77zm1.34 1.54c.38.48.75.96 1.1 1.45a1 1 0 1 0-1.1-1.45zm3.73 5.84c-.46-.92-.95-1.82-1.5-2.68a3 3 0 0 0 1.57-1.99 3 3 0 0 1-.07 4.67zm1.8 4.53c-.29-.9-.6-1.8-.97-2.67.44-.28.84-.63 1.17-1.03a2 2 0 0 1-.2 3.7zm1.14 5.51c-.14-1.21-.35-2.4-.62-3.57.45-.14.86-.35 1.23-.63a2.99 2.99 0 0 1-.6 4.2zM15 214a29 29 0 0 0-57.97 0h57.96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;
const DEFAULT_FONT_FAMILY = `'Bricolage Grotesque', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const DEFAULT_FONT_FALLBACK = `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

function resolveConfiguredFontFamily(fontFamily: string): string {
  if (fontFamily !== DEFAULT_FONT_FAMILY || typeof document === 'undefined') {
    return fontFamily;
  }

  const loadedBricolage = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-bricolage-grotesque')
    .trim();
  return loadedBricolage ? `${loadedBricolage}, ${DEFAULT_FONT_FALLBACK}` : fontFamily;
}

type HorizontalAlign = 'left' | 'center' | 'right';
type VerticalAlign = 'top' | 'middle' | 'bottom';

type TextLayer = {
  id: number;
  text: string;
  x: number;
  y: number;
  fontFamily: string;
  color: string;
  size: number;
  weight: number;
  alignX: HorizontalAlign;
  alignY: VerticalAlign;
};

type ImageLayer = {
  enabled: boolean;
  url: string;
  x: number;
  y: number;
  widthPercent: number;
  opacity: number;
};

type RenderOptions = {
  dataUriOrSvg: string;
  tiles: number;
  upscale: number;
  backgroundColor: string;
  imageLayer: ImageLayer;
  textLayers: TextLayer[];
};

function svgInputToMarkup(input: string): string {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error('Please provide an SVG data URI or SVG markup.');
  }

  if (trimmed.startsWith('<svg')) {
    return trimmed;
  }

  if (!trimmed.startsWith('data:image/svg+xml')) {
    throw new Error('Input must be SVG markup or a data:image/svg+xml URI.');
  }

  const separatorIndex = trimmed.indexOf(',');
  if (separatorIndex === -1) {
    throw new Error('Malformed data URI.');
  }

  const header = trimmed.slice(0, separatorIndex);
  const payload = trimmed.slice(separatorIndex + 1);

  if (header.includes(';base64')) {
    return atob(payload);
  }

  return decodeURIComponent(payload);
}

function loadSvgImage(svgMarkup: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load SVG image.'));
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;
  });
}

function loadExternalImage(imageUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load overlay image from URL.'));
    img.src = imageUrl;
  });
}

async function buildPatternCanvas(options: RenderOptions): Promise<HTMLCanvasElement> {
  const svgMarkup = svgInputToMarkup(options.dataUriOrSvg);
  const image = await loadSvgImage(svgMarkup);

  const safeTiles = Math.max(1, Math.min(20, Math.floor(options.tiles)));
  const safeUpscale = Math.max(1, Math.min(8, Math.floor(options.upscale)));

  const tileWidth = Math.max(1, image.naturalWidth * safeUpscale);
  const tileHeight = Math.max(1, image.naturalHeight * safeUpscale);

  const output = document.createElement('canvas');
  output.width = tileWidth * safeTiles;
  output.height = tileHeight * safeTiles;

  const outputContext = output.getContext('2d');
  if (!outputContext) {
    throw new Error('Could not create canvas context.');
  }

  outputContext.imageSmoothingEnabled = false;
  outputContext.fillStyle = options.backgroundColor;
  outputContext.fillRect(0, 0, output.width, output.height);

  const tile = document.createElement('canvas');
  tile.width = tileWidth;
  tile.height = tileHeight;

  const tileContext = tile.getContext('2d');
  if (!tileContext) {
    throw new Error('Could not create tile context.');
  }

  tileContext.imageSmoothingEnabled = false;
  tileContext.drawImage(image, 0, 0, tileWidth, tileHeight);

  const pattern = outputContext.createPattern(tile, 'repeat');
  if (!pattern) {
    throw new Error('Could not create a repeating pattern.');
  }

  outputContext.fillStyle = pattern;
  outputContext.fillRect(0, 0, output.width, output.height);

  if (options.imageLayer.enabled && options.imageLayer.url.trim()) {
    const image = await loadExternalImage(options.imageLayer.url.trim());
    const safeWidth = Math.max(2, Math.min(100, options.imageLayer.widthPercent));
    const safeOpacity = Math.max(0, Math.min(1, options.imageLayer.opacity));
    const targetWidth = (output.width * safeWidth) / 100;
    const targetHeight = (targetWidth * image.naturalHeight) / image.naturalWidth;
    const centerX = (output.width * options.imageLayer.x) / 100;
    const centerY = (output.height * options.imageLayer.y) / 100;

    outputContext.save();
    outputContext.globalAlpha = safeOpacity;
    outputContext.drawImage(
      image,
      centerX - targetWidth / 2,
      centerY - targetHeight / 2,
      targetWidth,
      targetHeight,
    );
    outputContext.restore();
  }

  for (const textLayer of options.textLayers) {
    const safeText = textLayer.text.trim();
    if (!safeText) {
      continue;
    }

    const safeTextSize = Math.max(12, Math.min(220, Math.floor(textLayer.size)));
    const safeTextWeight = Math.max(100, Math.min(900, Math.floor(textLayer.weight)));

    const resolvedFontFamily = resolveConfiguredFontFamily(textLayer.fontFamily);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      await document.fonts.load(`${safeTextWeight} ${safeTextSize}px ${resolvedFontFamily}`);
    }

    outputContext.textAlign = textLayer.alignX;
    outputContext.textBaseline = textLayer.alignY;
    outputContext.font = `${safeTextWeight} ${safeTextSize}px ${resolvedFontFamily}`;
    outputContext.fillStyle = textLayer.color;
    outputContext.strokeStyle = 'rgba(0,0,0,0.35)';
    outputContext.lineWidth = Math.max(2, safeTextSize * 0.1);

    const x = (output.width * textLayer.x) / 100;
    const y = (output.height * textLayer.y) / 100;
    outputContext.strokeText(safeText, x, y);
    outputContext.fillText(safeText, x, y);
  }

  return output;
}

export default function BackgroundGenerator() {
  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [tiles, setTiles] = useState(2);
  const [upscale, setUpscale] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState('#4541d9');
  const [imageLayer, setImageLayer] = useState<ImageLayer>({
    enabled: false,
    url: '',
    x: 50,
    y: 50,
    widthPercent: 25,
    opacity: 1,
  });
  const [textLayers, setTextLayers] = useState<TextLayer[]>([
    {
      id: 1,
      text: 'Fluxer Gaming',
      x: 50,
      y: 50,
      fontFamily: DEFAULT_FONT_FAMILY,
      color: '#ffffff',
      size: 72,
      weight: 800,
      alignX: 'center',
      alignY: 'middle',
    },
  ]);
  const [selectedTextId, setSelectedTextId] = useState(1);
  const [status, setStatus] = useState('Preview ready.');
  const [error, setError] = useState<string | null>(null);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedText = textLayers.find((layer) => layer.id === selectedTextId) ?? textLayers[0];

  const updateSelectedText = useCallback(
    (updater: (layer: TextLayer) => TextLayer) => {
      if (!selectedText) {
        return;
      }

      setTextLayers((layers) =>
        layers.map((layer) => (layer.id === selectedText.id ? updater(layer) : layer)),
      );
    },
    [selectedText],
  );

  const addTextLayer = useCallback(() => {
    setTextLayers((layers) => {
      const nextId = Math.max(0, ...layers.map((layer) => layer.id)) + 1;
      const nextLayer: TextLayer = {
        id: nextId,
        text: `Text ${nextId}`,
        x: 50,
        y: 50,
        fontFamily: DEFAULT_FONT_FAMILY,
        color: '#ffffff',
        size: 64,
        weight: 700,
        alignX: 'center',
        alignY: 'middle',
      };
      setSelectedTextId(nextId);
      return [...layers, nextLayer];
    });
  }, []);

  const removeSelectedTextLayer = useCallback(() => {
    if (!selectedText || textLayers.length <= 1) {
      return;
    }

    const remaining = textLayers.filter((layer) => layer.id !== selectedText.id);
    setTextLayers(remaining);
    setSelectedTextId(remaining[0].id);
  }, [selectedText, textLayers]);

  const renderPreview = useCallback(async () => {
    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) {
      return;
    }

    const output = await buildPatternCanvas({
      dataUriOrSvg: source,
      tiles,
      upscale,
      backgroundColor,
      imageLayer,
      textLayers,
    });

    previewCanvas.width = output.width;
    previewCanvas.height = output.height;

    const previewContext = previewCanvas.getContext('2d');
    if (!previewContext) {
      throw new Error('Could not create preview context.');
    }

    previewContext.imageSmoothingEnabled = false;
    previewContext.clearRect(0, 0, output.width, output.height);
    previewContext.drawImage(output, 0, 0);
  }, [backgroundColor, imageLayer, source, textLayers, tiles, upscale]);

  useEffect(() => {
    let isActive = true;

    const run = async () => {
      try {
        setError(null);
        await renderPreview();
        if (isActive) {
          setStatus('Preview ready.');
        }
      } catch (previewError) {
        if (isActive) {
          setError(previewError instanceof Error ? previewError.message : 'Unknown preview error.');
          setStatus('Preview failed.');
        }
      }
    };

    void run();

    return () => {
      isActive = false;
    };
  }, [renderPreview]);

  const handleDownload = useCallback(async () => {
    try {
      setError(null);
      setStatus('Generating image...');

      const output = await buildPatternCanvas({
        dataUriOrSvg: source,
        tiles,
        upscale,
        backgroundColor,
        imageLayer,
        textLayers,
      });

      const link = document.createElement('a');
      link.download = `background-${tiles}x${tiles}-${upscale}x.png`;
      link.href = output.toDataURL('image/png');
      link.click();

      setStatus('Downloaded PNG.');
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'Unknown download error.');
      setStatus('Download failed.');
    }
  }, [backgroundColor, imageLayer, source, textLayers, tiles, upscale]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-10 text-foreground sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(111,107,255,0.24),transparent_35%),radial-gradient(circle_at_90%_75%,rgba(42,39,144,0.22),transparent_40%),linear-gradient(120deg,rgba(11,10,29,1),rgba(20,18,62,1))]" />

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="rounded-3xl border border-white/12 bg-black/25 p-6 backdrop-blur-md sm:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-white/65">Fluxer Tooling</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Background Generator
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
            Paste your SVG data URI (or raw SVG), tweak the tiling settings, preview it instantly, then download a PNG.
          </p>

          <label className="mt-6 block text-sm font-medium text-white/90" htmlFor="svg-source">
            SVG source
          </label>
          <textarea
            id="svg-source"
            className="mt-2 h-44 w-full resize-y rounded-2xl border border-white/14 bg-[#0d0c27]/90 p-3 font-mono text-xs leading-5 text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-[#6f6bff]"
            value={source}
            onChange={(event) => setSource(event.target.value)}
            spellCheck={false}
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <label className="text-sm text-white/88" htmlFor="tiles">
              Tiles
              <input
                id="tiles"
                type="number"
                min={1}
                max={20}
                value={tiles}
                onChange={(event) => setTiles(Number(event.target.value))}
                className="mt-1.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 px-3 py-2 text-sm text-white outline-none focus:border-[#6f6bff]"
              />
            </label>

            <label className="text-sm text-white/88" htmlFor="upscale">
              Upscale
              <input
                id="upscale"
                type="number"
                min={1}
                max={8}
                value={upscale}
                onChange={(event) => setUpscale(Number(event.target.value))}
                className="mt-1.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 px-3 py-2 text-sm text-white outline-none focus:border-[#6f6bff]"
              />
            </label>

            <label className="text-sm text-white/88" htmlFor="background-color">
              Background
              <input
                id="background-color"
                type="color"
                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
                className="mt-1.5 h-10.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 p-1 outline-none focus:border-[#6f6bff]"
              />
            </label>
          </div>

          <div className="mt-6 rounded-2xl border border-white/12 bg-[#0d0c27]/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white/90">Overlay image (URL)</p>
              <label className="inline-flex items-center gap-2 text-sm text-white/85" htmlFor="image-enabled">
                <input
                  id="image-enabled"
                  type="checkbox"
                  checked={imageLayer.enabled}
                  onChange={(event) =>
                    setImageLayer((current) => ({ ...current, enabled: event.target.checked }))
                  }
                  className="h-4 w-4 accent-[#6f6bff]"
                />
                Enabled
              </label>
            </div>

            <label className="mt-3 block text-sm text-white/88" htmlFor="image-url">
              Image URL
            </label>
            <input
              id="image-url"
              type="url"
              value={imageLayer.url}
              onChange={(event) =>
                setImageLayer((current) => ({ ...current, url: event.target.value }))
              }
              className="mt-1.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#6f6bff]"
              placeholder="https://example.com/logo.png"
            />

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-white/88" htmlFor="image-x">
                X position (%): {imageLayer.x}
                <input
                  id="image-x"
                  type="range"
                  min={0}
                  max={100}
                  value={imageLayer.x}
                  onChange={(event) =>
                    setImageLayer((current) => ({ ...current, x: Number(event.target.value) }))
                  }
                  className="mt-1.5 w-full accent-[#6f6bff]"
                />
              </label>

              <label className="text-sm text-white/88" htmlFor="image-y">
                Y position (%): {imageLayer.y}
                <input
                  id="image-y"
                  type="range"
                  min={0}
                  max={100}
                  value={imageLayer.y}
                  onChange={(event) =>
                    setImageLayer((current) => ({ ...current, y: Number(event.target.value) }))
                  }
                  className="mt-1.5 w-full accent-[#6f6bff]"
                />
              </label>

              <label className="text-sm text-white/88" htmlFor="image-width">
                Width (%): {imageLayer.widthPercent}
                <input
                  id="image-width"
                  type="range"
                  min={2}
                  max={100}
                  value={imageLayer.widthPercent}
                  onChange={(event) =>
                    setImageLayer((current) => ({ ...current, widthPercent: Number(event.target.value) }))
                  }
                  className="mt-1.5 w-full accent-[#6f6bff]"
                />
              </label>

              <label className="text-sm text-white/88" htmlFor="image-opacity">
                Opacity: {imageLayer.opacity.toFixed(2)}
                <input
                  id="image-opacity"
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={imageLayer.opacity}
                  onChange={(event) =>
                    setImageLayer((current) => ({ ...current, opacity: Number(event.target.value) }))
                  }
                  className="mt-1.5 w-full accent-[#6f6bff]"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/12 bg-[#0d0c27]/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-white/90">Text layers</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addTextLayer()}
                  className="rounded-lg border border-white/18 px-3 py-1.5 text-xs font-medium text-white/90 hover:bg-white/8"
                >
                  Add text
                </button>
                <button
                  type="button"
                  onClick={() => removeSelectedTextLayer()}
                  className="rounded-lg border border-white/18 px-3 py-1.5 text-xs font-medium text-white/90 hover:bg-white/8 disabled:opacity-45"
                  disabled={textLayers.length <= 1}
                >
                  Remove selected
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {textLayers.map((layer, index) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedTextId(layer.id)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    selectedText?.id === layer.id
                      ? 'border-[#6f6bff] bg-[#6f6bff]/20 text-white'
                      : 'border-white/18 text-white/80 hover:bg-white/8'
                  }`}
                >
                  {index + 1}. {layer.text || 'Untitled'}
                </button>
              ))}
            </div>

            {selectedText ? (
              <>
                <label className="mt-4 block text-sm text-white/88" htmlFor="text-content">
                  Selected text content
                </label>
                <input
                  id="text-content"
                  type="text"
                  value={selectedText.text}
                  onChange={(event) =>
                    updateSelectedText((layer) => ({ ...layer, text: event.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#6f6bff]"
                  placeholder="Type text"
                />

                <label className="mt-3 block text-sm text-white/88" htmlFor="text-font-family">
                  Font family
                </label>
                <input
                  id="text-font-family"
                  type="text"
                  value={selectedText.fontFamily}
                  onChange={(event) =>
                    updateSelectedText((layer) => ({ ...layer, fontFamily: event.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#6f6bff]"
                />

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="text-sm text-white/88" htmlFor="text-x">
                    X position (%): {selectedText.x}
                    <input
                      id="text-x"
                      type="range"
                      min={0}
                      max={100}
                      value={selectedText.x}
                      onChange={(event) =>
                        updateSelectedText((layer) => ({ ...layer, x: Number(event.target.value) }))
                      }
                      className="mt-1.5 w-full accent-[#6f6bff]"
                    />
                  </label>

                  <label className="text-sm text-white/88" htmlFor="text-y">
                    Y position (%): {selectedText.y}
                    <input
                      id="text-y"
                      type="range"
                      min={0}
                      max={100}
                      value={selectedText.y}
                      onChange={(event) =>
                        updateSelectedText((layer) => ({ ...layer, y: Number(event.target.value) }))
                      }
                      className="mt-1.5 w-full accent-[#6f6bff]"
                    />
                  </label>

                  <label className="text-sm text-white/88" htmlFor="text-size">
                    Size
                    <input
                      id="text-size"
                      type="number"
                      min={12}
                      max={220}
                      value={selectedText.size}
                      onChange={(event) =>
                        updateSelectedText((layer) => ({ ...layer, size: Number(event.target.value) }))
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 px-3 py-2 text-sm text-white outline-none focus:border-[#6f6bff]"
                    />
                  </label>

                  <label className="text-sm text-white/88" htmlFor="text-weight">
                    Weight
                    <input
                      id="text-weight"
                      type="number"
                      min={100}
                      max={900}
                      step={100}
                      value={selectedText.weight}
                      onChange={(event) =>
                        updateSelectedText((layer) => ({ ...layer, weight: Number(event.target.value) }))
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 px-3 py-2 text-sm text-white outline-none focus:border-[#6f6bff]"
                    />
                  </label>

                  <label className="text-sm text-white/88" htmlFor="text-color">
                    Color
                    <input
                      id="text-color"
                      type="color"
                      value={selectedText.color}
                      onChange={(event) =>
                        updateSelectedText((layer) => ({ ...layer, color: event.target.value }))
                      }
                      className="mt-1.5 h-10.5 w-full rounded-xl border border-white/14 bg-[#0d0c27]/90 p-1 outline-none focus:border-[#6f6bff]"
                    />
                  </label>
                </div>

                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/55">Quick alignment</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateSelectedText((layer) => ({ ...layer, x: 5, alignX: 'left' }))
                    }
                    className="rounded-lg border border-white/18 px-3 py-1.5 text-xs text-white/90 hover:bg-white/8"
                  >
                    Left
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSelectedText((layer) => ({ ...layer, x: 50, alignX: 'center' }))
                    }
                    className="rounded-lg border border-white/18 px-3 py-1.5 text-xs text-white/90 hover:bg-white/8"
                  >
                    Center
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSelectedText((layer) => ({ ...layer, x: 95, alignX: 'right' }))
                    }
                    className="rounded-lg border border-white/18 px-3 py-1.5 text-xs text-white/90 hover:bg-white/8"
                  >
                    Right
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSelectedText((layer) => ({ ...layer, y: 8, alignY: 'top' }))
                    }
                    className="rounded-lg border border-white/18 px-3 py-1.5 text-xs text-white/90 hover:bg-white/8"
                  >
                    Top
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSelectedText((layer) => ({ ...layer, y: 50, alignY: 'middle' }))
                    }
                    className="rounded-lg border border-white/18 px-3 py-1.5 text-xs text-white/90 hover:bg-white/8"
                  >
                    Middle
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSelectedText((layer) => ({ ...layer, y: 92, alignY: 'bottom' }))
                    }
                    className="rounded-lg border border-white/18 px-3 py-1.5 text-xs text-white/90 hover:bg-white/8"
                  >
                    Bottom
                  </button>
                </div>
              </>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSource(DEFAULT_SOURCE);
              }}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/18 px-5 text-sm font-medium text-white/90 transition hover:border-white/35 hover:bg-white/8"
            >
              Use Demo SVG
            </button>

            <button
              type="button"
              onClick={() => void handleDownload()}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#4440d8] px-6 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(68,64,216,0.45)] transition hover:-translate-y-0.5 hover:bg-[#5a56e3]"
            >
              Download PNG
            </button>
          </div>

          <p className="mt-4 text-sm text-white/78">{status}</p>
          {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
        </div>

        <div className="rounded-3xl border border-white/12 bg-black/25 p-6 backdrop-blur-md sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Preview</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Live</p>
          </div>
          <div className="overflow-auto rounded-2xl border border-white/12 bg-[#0d0c27]/90 p-3">
            <canvas
              ref={previewCanvasRef}
              className="h-auto max-w-full rounded-lg"
              aria-label="Background preview canvas"
            />
          </div>
        </div>
      </section>
    </main>
  );
}