let currentTable = 'clientes'; // Tabla activa por defecto

// URLs de las APIs desplegadas en Render
const API_URL_CLIENTES = 'https://mi-aplicacion.onrender.com/api/clientes';
const API_URL_SUCURSALES = 'https://mi-aplicacion.onrender.com/api/sucursales';
const API_URL_PRESTAMOS = 'https://mi-aplicacion.onrender.com/api/prestamos';
const API_URL_CUENTAS = 'https://mi-aplicacion.onrender.com/api/cuentas';
const API_URL_IMPOSITORES = 'https://mi-aplicacion.onrender.com/api/impositores';

// Cargar una tabla específica
function loadTable(table) {
    currentTable = table;
    document.getElementById('table-title').textContent = table.charAt(0).toUpperCase() + table.slice(1); // Cambia el título
    fetchData(table); // Llama a la función para obtener los datos de esa tabla
}

// Obtener la URL de la API según la tabla seleccionada
function getApiUrl(table) {
    switch (table) {
        case 'clientes':
            return API_URL_CLIENTES;
        case 'sucursales':
            return API_URL_SUCURSALES;
        case 'prestamos':
            return API_URL_PRESTAMOS;
        case 'cuentas':
            return API_URL_CUENTAS;
        case 'impositores':
            return API_URL_IMPOSITORES;
        default:
            return API_URL_CLIENTES; // Por defecto, clientes
    }
}

// Obtener datos de la tabla actual
function fetchData(table) {
    const apiUrl = getApiUrl(table);
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

            // Si hay datos, creamos las filas para la tabla
            if (data && data.length > 0) {
                data.forEach(row => {
                    const rowHTML = `
                        <tr>
                            ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                        </tr>
                    `;
                    tableBody.innerHTML += rowHTML;
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="4">No hay datos para mostrar</td></tr>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Buscar datos por cualquier parámetro en la tabla activa
function searchData() {
    const searchTerm = document.getElementById('search').value;
    const apiUrl = getApiUrl(currentTable) + `?search=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');
            tableBody.innerHTML = '';

            if (data && data.length > 0) {
                data.forEach(row => {
                    const rowHTML = `
                        <tr>
                            ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                        </tr>
                    `;
                    tableBody.innerHTML += rowHTML;
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="4">No se encontraron resultados</td></tr>';
            }
        })
        .catch(error => console.error('Error searching data:', error));
}

// Función para imprimir la tabla
function printTable() {
    const tableHTML = document.querySelector('#data-table').outerHTML; // Obtener el HTML de la tabla
    const printWindow = window.open('', '', 'height=800,width=1200');
    printWindow.document.write('<html><head><title>Imprimir Tabla</title></head><body>');
    printWindow.document.write(tableHTML); // Incluir la tabla en la nueva ventana
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print(); // Llamar al método de impresión
}
