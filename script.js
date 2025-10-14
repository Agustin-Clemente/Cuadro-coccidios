
            const COCCIDIA_DATA = {
                'Eimeria spp.': { hd: 'Aves/Rumiantes/Cerdos/Equinos (Específico)', loc: 'Ooquiste maduro', ciclo: 'Monoxeno', tisular: 'Ninguna (Solo intestinal)' },
                'Toxoplasma gondii': { hd: 'Felino', loc: 'Ooquiste maduro/Taquizoito/Bradizoito', ciclo: 'Heteroxeno Facultativo', tisular: 'Bradizoítos (Quistes Tisulares)/Taquizoitos (Pseudoquistes)' },
                'Isospora spp (Cystoisospora spp)': { hd: 'Perro/Gato/Cerdo (Específico)', loc: 'Ooquiste maduro/Hipnozoito', ciclo: 'Monoxeno', tisular: 'Hipnozoitos' },
                'Cryptosporidium parvum': { hd: 'Rumiantes - Humano', loc: 'Ooquiste maduro/Autoinfección (ooquiste pared delgada)', ciclo: 'Monoxeno', tisular: 'Ninguna (Solo intestinal)' },
                'Neospora caninum': { hd: 'Canino', loc: 'Ooquiste maduro/Taquizoito/Bradizoito', ciclo: 'Heteroxeno Facultativo', tisular: 'Bradizoítos (Quistes Tisulares)/Taquizoitos (Pseudoquistes)' },
                'Sarcocystis spp.': { hd: 'Carnívoro (Predador)', loc: 'Bradizoito', ciclo: 'Heteroxeno', tisular: 'Bradizoítos (Sarcoquistes musculares)' },
                'Hepatozoon canis': { hd: 'Garrapata (Rhipicephalus sanguineus)', loc: 'Gamontes en glóbulos blancos de canino', ciclo: 'Heteroxeno', tisular: 'Gamontes en glóbulos blancos de canino' }
            };

            
            const OPTIONS_HD = [
                'Felino', 
                'Perro/Gato/Cerdo (Específico)', 
                'Rumiantes - Humano', 
                'Canino', 
                'Carnívoro (Predador)', 
                'Garrapata (Rhipicephalus sanguineus)', 
                'Aves/Rumiantes/Cerdos/Equinos (Específico)'
            ];

            const OPTIONS_LOC = [
                'Ooquiste maduro',
                'Ooquiste maduro/Taquizoito/Bradizoito',
                'Ooquiste maduro/Taquizoito/Bradizoito',
                'Ooquiste maduro/Hipnozoito',
                'Ooquiste maduro/Autoinfección (ooquiste pared delgada)',
                'Bradizoito',
                'Gamontes en glóbulos blancos de canino'
            ];

            const OPTIONS_CICLO = [
                'Monoxeno', 
                'Monoxeno',
                'Monoxeno',
                'Heteroxeno',
                'Heteroxeno',
                'Heteroxeno Facultativo',
                'Heteroxeno Facultativo'
            ];

            const OPTIONS_TISULAR = [
                'Bradizoítos (Quistes Tisulares)/Taquizoitos (Pseudoquistes)', 
                'Hipnozoitos', 
                'Ninguna (Solo intestinal)', 
                'Bradizoítos (Quistes Tisulares)/Taquizoitos (Pseudoquistes)', 
                'Bradizoítos (Sarcoquistes musculares)', 
                'Gamontes en glóbulos blancos de canino', 
                'Ninguna (Solo intestinal)'
            ];
            
            const COCCIDIA_OPTION_GROUPS = [
                { title: 'Hospedador Definitivo', options: OPTIONS_HD, optionsId: 'hd-options', placeholderIndex: 0 },
                { title: 'Forma infectante para HD', options: OPTIONS_LOC, optionsId: 'loc-options', placeholderIndex: 1 },
                { title: 'Tipo de Ciclo', options: OPTIONS_CICLO, optionsId: 'ciclo-options', placeholderIndex: 2 },
                { title: 'Forma Enquistada o Tisular', options: OPTIONS_TISULAR, optionsId: 'tisular-options', placeholderIndex: 3 }
            ];
            
            const EIMERIA_SEQUENCE = [
                'Ooquiste no esporulado',
                'Esporulación (Esporogonia)',
                'Ooquiste maduro (esporulado)',
                'Liberación de esporozoítos y penetración de células intestinales',
                'Esquizogonia',
                'Gametogonia',
                'Cigoto y formación de ooquiste'
            ];

            const EIMERIA_PLACEHOLDERS = [
                'Se elimina con las heces',
                'Proceso de maduración en el Ambiente',
                'Forma Infectante',
                'Inicio de Infección',
                'Fase de multiplicación Asexual',
                'Fase Sexual',
                'Producto de la fecundación (singamia)'
            ];
            
            const COCCIDIA_PLACEHOLDERS = [
                'Hospedador Definitivo',
                'Forma infectante para HD',
                'Tipo de Ciclo',
                'Forma Enquistada/Tisular'
            ];


            // --- ESTADO GLOBAL ---
            let selectedOption = null;

            // --- FUNCIONES DE INTERACCIÓN (CLICK) ---
            
            /**
             * Determina el texto de placeholder para un click-target específico.
             */
            function getPlaceholderText(targetElement, optionsContainerId) {
                if (optionsContainerId === 'eimeria-options') {
                     const targetContainer = document.getElementById('eimeria-targets');
                     const targets = Array.from(targetContainer.querySelectorAll('.click-target'));
                     const index = targets.indexOf(targetElement);
                     
                     if (index !== -1 && index < EIMERIA_PLACEHOLDERS.length) {
                          return EIMERIA_PLACEHOLDERS[index];
                     }
                    return 'Clic aquí para colocar el paso'; 
                }
                
                if (optionsContainerId === 'coccidia-options') {
                    const cell = targetElement.closest('td');
                    if (cell) {
                         const cellIndex = cell.cellIndex - 1; 
                         if (cellIndex >= 0 && cellIndex < COCCIDIA_PLACEHOLDERS.length) {
                             return `Colocar: ${COCCIDIA_PLACEHOLDERS[cellIndex]}`;
                         }
                    }
                    return 'vacío'; 
                }
                return '';
            }
            
            /**
             * Maneja la selección de una opción (botón), permitiendo seleccionarla desde el pool o desde un target.
             */
            function handleOptionClick(event, optionElement) {
                event.stopPropagation();
                
                // 1. Si estamos haciendo clic en la opción que ya estaba seleccionada, la deseleccionamos.
                if (selectedOption === optionElement) {
                    optionElement.classList.remove('selected');
                    selectedOption = null;
                    return;
                }

                // 2. Deseleccionar el elemento previamente seleccionado (si existe)
                if (selectedOption) {
                    selectedOption.classList.remove('selected');
                }
                
                // 3. Seleccionar el ítem actual y asignarlo al estado global
                optionElement.classList.add('selected');
                selectedOption = optionElement;
            }
            
            /**
             * Maneja la remoción explícita de un ítem de un slot mediante el botón "X" o al ser movido.
             * @param {Event | Object} event - El objeto de evento del click (real) o un objeto simulado (interno).
             * @param {string} optionsContainerId - ID del contenedor de opciones original (pool).
             */
            function handleRemoveFromSlot(event, optionsContainerId) {
                // CORRECCIÓN: Verificar si stopPropagation existe (solo en eventos reales, no simulados)
                if (typeof event.stopPropagation === 'function') {
                    event.stopPropagation();
                }

                const removeButton = event.currentTarget;
                const targetElement = removeButton.closest('.click-target');
                if (!targetElement) return;

                const itemWrapper = removeButton.closest('.dropped-item-wrapper');
                const displacedItem = itemWrapper ? itemWrapper.querySelector('.option-item') : null;
                
                if (!displacedItem) return;

                // 1. Resetear el estado global si este ítem estaba seleccionado
                if (selectedOption === displacedItem) {
                    displacedItem.classList.remove('selected');
                    selectedOption = null;
                }
                
                // --- LÓGICA CLAVE: Devolver al Pool respetando el orden original ---
                const optionsContainer = displacedItem.dataset.originalContainerId ? document.getElementById(displacedItem.dataset.originalContainerId) : null;
                const originalIndex = displacedItem.dataset.originalIndex ? parseInt(displacedItem.dataset.originalIndex) : -1;

                if (optionsContainer && originalIndex !== -1) {
                    // Limpieza de clases de slot
                    displacedItem.classList.remove('text-white', 'px-3', 'py-1', 'rounded-lg', 'flex-1', 'text-center'); 
                    
                    // Restauración de clases de pool (text-base para A1, text-sm para A2)
                    const isEimeria = optionsContainerId === 'eimeria-options';
                    const fontSizeClass = isEimeria ? 'text-base' : 'text-sm';
                    displacedItem.classList.add('bg-gray-600', 'text-gray-100', fontSizeClass, 'px-4'); 
                    
                    // Encontrar la posición correcta para la inserción ordenada
                    let inserted = false;
                    const children = Array.from(optionsContainer.children);
                    
                    // Iteramos sobre los hijos del contenedor para encontrar la posición correcta
                    for (let i = 0; i < children.length; i++) {
                        const childIndex = children[i].dataset.originalIndex ? parseInt(children[i].dataset.originalIndex) : Infinity;
                        
                        // Si encontramos un elemento con un índice mayor que el nuestro, insertamos antes de él
                        if (childIndex > originalIndex) {
                            optionsContainer.insertBefore(displacedItem, children[i]);
                            inserted = true;
                            break;
                        }
                    }
                    
                    // Si no se encontró un elemento con índice mayor, se inserta al final del grupo (debería ser el último)
                    if (!inserted) {
                         optionsContainer.appendChild(displacedItem);
                    }
                } else {
                    // Fallback: mover al final si falta la data de origen
                    document.getElementById(optionsContainerId).appendChild(displacedItem);
                }
                // --- FIN LÓGICA CLAVE ---
                
                // 2. Limpiar el target y restaurar placeholder
                const placeholderText = getPlaceholderText(targetElement, optionsContainerId);

                // Remover el wrapper antes de limpiar el textContent del target
                if (itemWrapper && itemWrapper.parentNode === targetElement) {
                     targetElement.removeChild(itemWrapper);
                }
                
                targetElement.textContent = placeholderText; // Restaurar placeholder
                targetElement.classList.remove('correct', 'incorrect', 'filled-target');
                targetElement.classList.add('text-gray-400');
            }


            /**
             * Maneja el click en un destino (celda/slot).
             */
            function handleTargetClick(targetElement, optionsContainerId) {
                const optionsContainer = document.getElementById(optionsContainerId);

                // Determinar el texto de placeholder correcto para el target actual
                const placeholderText = getPlaceholderText(targetElement, optionsContainerId);
                const oldTarget = selectedOption ? selectedOption.closest('.click-target') : null;

                // CASO B: El usuario hace click en un destino LLENO SIN haber seleccionado una opción nueva. (Click para devolver al pool)
                if (!selectedOption && targetElement.classList.contains('filled-target')) {
                    // Si ya está lleno, buscamos el item dentro del wrapper.
                    const itemWrapper = targetElement.querySelector('.dropped-item-wrapper');
                    const displacedItem = itemWrapper ? itemWrapper.querySelector('.option-item') : null;

                    if (displacedItem) {
                        // Usamos la lógica de remoción (pasando un objeto simulado para evitar el TypeError)
                        handleRemoveFromSlot({ currentTarget: itemWrapper.querySelector('button') }, optionsContainerId);
                    }
                    return; 
                }

                // CASO A: El usuario tiene una opción seleccionada, lista para ser soltada.
                if (!selectedOption) {
                    return;
                }

                // --- LÓGICA DE DESPLAZAMIENTO: Si el ítem seleccionado proviene de OTRO slot, limpiamos el slot viejo. ---
                if (oldTarget) {
                    const oldPlaceholderText = getPlaceholderText(oldTarget, optionsContainerId);
                    
                    // Limpiamos el slot viejo. Buscamos el wrapper.
                    const oldItemWrapper = oldTarget.querySelector('.dropped-item-wrapper');
                    if(oldItemWrapper) oldTarget.removeChild(oldItemWrapper);
                    
                    oldTarget.classList.remove('filled-target', 'correct', 'incorrect');
                    oldTarget.classList.add('text-gray-400');
                    oldTarget.textContent = oldPlaceholderText; 
                }
                // --- FIN LÓGICA DE DESPLAZAMIENTO ---


                // 1. Revisar si el destino YA tiene una opción (va a ser reemplazada)
                if (targetElement.classList.contains('filled-target')) {
                    // Mover la opción existente de vuelta al contenedor original
                    const itemWrapper = targetElement.querySelector('.dropped-item-wrapper');
                    const displacedItem = itemWrapper ? itemWrapper.querySelector('.option-item') : null;

                    if (displacedItem) {
                        // Usamos la lógica de remoción para mover al pool de forma ordenada (pasando un objeto simulado)
                        handleRemoveFromSlot({ currentTarget: itemWrapper.querySelector('button') }, optionsContainerId);
                    }
                }

                // 2. Mover la opción seleccionada al destino y crear el wrapper con la "X"
                
                // Crear el wrapper para contener la opción y el botón X
                const itemWrapper = document.createElement('div');
                itemWrapper.classList.add('dropped-item-wrapper', 'flex', 'items-center', 'justify-between', 'w-full', 'h-full');
                
                // Lo preparamos para el estilo de slot (fondo transparente, texto claro)
                selectedOption.classList.remove('selected', 'bg-gray-600', 'text-gray-100', 'text-base', 'text-sm', 'px-4');
                selectedOption.classList.add('text-white', 'px-3', 'py-1', 'rounded-lg', 'flex-1', 'text-center'); 
                selectedOption.style.padding = '4px 10px'; 
                
                
                const removeButton = document.createElement('button');
                removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                removeButton.classList.add(
                    'bg-gray-700', 'text-red-400', 'hover:bg-gray-600', 'hover:text-red-300', 
                    'text-base', 'font-bold',
                    'rounded-full', 'w-6', 'h-6', 'flex', 'items-center', 'justify-center',
                    'transition-colors', 'duration-150', 'ml-2', 'flex-shrink-0', 
                    'border', 'border-gray-600'
                );
                // Usamos el handler
                removeButton.addEventListener('click', (e) => handleRemoveFromSlot(e, optionsContainerId));
                
                // Adjuntar al wrapper
                itemWrapper.appendChild(selectedOption);
                itemWrapper.appendChild(removeButton);

                // Aplicar estilo de integración al TARGET
                targetElement.classList.remove('correct', 'incorrect', 'text-gray-400', 'justify-center');
                targetElement.classList.add('filled-target'); 
                targetElement.textContent = ''; // Limpiar el placeholder
                
                targetElement.appendChild(itemWrapper);

                // 3. Resetear estado
                selectedOption = null;
            }

            /**
             * Maneja el click en el contenedor de opciones (pool) para devolver un ítem seleccionado.
             */
            function handlePoolDrop(event, optionsContainerId) {
                // Asegurarse de que el clic no haya caído en una opción ya en el pool
                if (event.target.closest('.option-item')) {
                    return; 
                }
                
                if (!selectedOption) {
                    return; 
                }
                
                // Comprobar si la opción seleccionada proviene de un target (slot)
                const oldTarget = selectedOption.closest('.click-target');
                
                if (!oldTarget) {
                    return; // Item is already in the pool.
                }

                // --- LÓGICA DE DEVOLUCIÓN AL POOL ---
                
                const oldItemWrapper = oldTarget.querySelector('.dropped-item-wrapper');
                if (!oldItemWrapper) return; 

                // Simulamos el click en el botón 'X' para reutilizar la lógica de retorno ordenado (pasando un objeto simulado)
                const removeButton = oldItemWrapper.querySelector('button');
                if(removeButton) {
                    handleRemoveFromSlot({ currentTarget: removeButton }, optionsContainerId);
                }
                
                // 3. Resetear estado
                selectedOption = null;
            }


            // --- LÓGICA DE VERIFICACIÓN (Actividad 1: Eimeria) ---

            function checkEimeriaSequence() {
                let correctCount = 0;
                const totalSteps = EIMERIA_SEQUENCE.length;
                const targets = document.querySelectorAll('#eimeria-targets .click-target');
                const feedbackElement = document.getElementById('feedback-eimeria');

                targets.forEach((target, index) => {
                    target.classList.remove('correct', 'incorrect');
                    const droppedItem = target.querySelector('.dropped-item-wrapper .option-item');
                    
                    target.classList.remove('filled-target');
                    
                    if (droppedItem) {
                        const droppedValue = droppedItem.textContent.trim();
                        const correctValue = EIMERIA_SEQUENCE[index];
                        
                        if (droppedValue === correctValue) {
                            target.classList.add('correct');
                            correctCount++;
                        } else {
                            target.classList.add('incorrect');
                        }
                    } else {
                        target.classList.add('incorrect'); 
                    }
                });

                const percentage = (correctCount / totalSteps) * 100;
                feedbackElement.classList.remove('hidden', 'bg-green-700', 'bg-red-700');
                
                if (percentage === 100) {
                    feedbackElement.textContent = `¡Felicidades! Secuencia de Eimeria correcta.`;
                    feedbackElement.classList.add('bg-green-700');
                    feedbackElement.classList.remove('bg-red-700');
                } else {
                    feedbackElement.textContent = `Resultado: ${correctCount} de ${totalSteps} correctas. Revise los pasos incorrectos.`;
                    feedbackElement.classList.add('bg-red-700');
                    feedbackElement.classList.remove('bg-green-700');
                }
                
                // Restaurar el estilo filled-target si el ítem sigue dentro
                targets.forEach(target => {
                    if (target.querySelector('.dropped-item-wrapper')) {
                        target.classList.add('filled-target');
                    }
                });
            }
            
            // --- LÓGICA DE VERIFICACIÓN (Actividad 2: Coccidia Table) ---

            function checkCoccidiaTable() {
                let correctCount = 0;
                const totalPossible = Object.keys(COCCIDIA_DATA).length * 4; 
                const tableBody = document.getElementById('coccidia-table-body');
                const allRows = tableBody.querySelectorAll('tr');
                const feedbackElement = document.getElementById('feedback-coccidia');

                allRows.forEach(row => {
                    const coccidioName = row.cells[0].textContent.trim();
                    const correctData = COCCIDIA_DATA[coccidioName];

                    // Columnas 1 a 4 (HD, Loc, Ciclo, Tisular)
                    for (let i = 1; i < row.cells.length; i++) {
                        const cell = row.cells[i].querySelector('.click-target');
                        
                        // 1. Limpiar estilos antes de revisar
                        cell.classList.remove('correct', 'incorrect'); 
                        cell.classList.remove('filled-target'); 
                        
                        const attributeKeys = ['hd', 'loc', 'ciclo', 'tisular'];
                        const dataKey = attributeKeys[i - 1]; 

                        const correctValue = correctData[dataKey];
                        const droppedItem = cell.querySelector('.dropped-item-wrapper .option-item');
                        
                        // 2. Aplicar correct/incorrect
                        if (droppedItem) {
                            const droppedValue = droppedItem.textContent.trim();
                            
                            if (droppedValue === correctValue) {
                                cell.classList.add('correct');
                                correctCount++;
                            } else {
                                cell.classList.add('incorrect');
                            }
                            cell.classList.add('filled-target'); // Restaurar estilo filled
                        } else {
                             cell.classList.add('incorrect'); // Si la celda está vacía
                        }
                    }
                });


                const percentage = (correctCount / totalPossible) * 100;
                feedbackElement.classList.remove('hidden', 'bg-green-700', 'bg-red-700');

                if (percentage === 100) {
                    feedbackElement.textContent = `¡Excelente! Todas las ${correctCount} comparaciones son correctas.`;
                    feedbackElement.classList.add('bg-green-700');
                    feedbackElement.classList.remove('bg-red-700');
                } else {
                    feedbackElement.textContent = `Resultado: ${correctCount} de ${totalPossible} correctas. Revise las celdas marcadas en rojo e inténtelo de nuevo.`;
                    feedbackElement.classList.add('bg-red-700');
                    feedbackElement.classList.remove('bg-green-700');
                }
            }
            
            // --- INICIALIZACIÓN Y SHUFFLE ---
            
            /**
             * Función auxiliar para mezclar un array (Algoritmo Fisher-Yates).
             */
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            /**
             * Genera y adjunta las opciones clicables a un contenedor (Actividad 1: Eimeria).
             */
            function generateOptions(containerId, optionsArray) {
                const optionsContainer = document.getElementById(containerId);
                optionsContainer.innerHTML = '';
                
                const originalOptions = [...optionsArray];
                const shuffledOptions = shuffleArray([...optionsArray]);
                
                shuffledOptions.forEach((optionText) => {
                    const item = document.createElement('div');
                    item.textContent = optionText;
                    item.classList.add(
                        'option-item', 
                        'px-4', 'py-2', 'bg-gray-600', 'rounded-full', 
                        'text-base', 'text-gray-100', 'shadow-sm', 'hover:bg-gray-500', 
                        'whitespace-nowrap', 'flex-shrink-0'
                    );
                    
                    // --- CLAVE PARA EL ORDEN: Almacenar índice y contenedor de origen ---
                    // Usamos el índice de la primera ocurrencia en la lista original completa
                    item.dataset.originalIndex = optionsArray.indexOf(optionText); 
                    item.dataset.originalContainerId = containerId;
                    
                    item.addEventListener('click', (e) => handleOptionClick(e, item));
                    optionsContainer.appendChild(item);
                });
            }
            
            /**
             * Genera y adjunta las opciones clicables agrupadas (Actividad 2: Tabla).
             */
            function generateGroupedOptions(containerId) {
                const mainOptionsContainer = document.getElementById(containerId);
                mainOptionsContainer.innerHTML = '';

                COCCIDIA_OPTION_GROUPS.forEach(group => {
                    const groupHeader = document.createElement('h4');
                    groupHeader.textContent = group.title;
                    groupHeader.classList.add('font-bold', 'text-xl', 'text-teal-300', 'mt-6', 'uppercase', 'tracking-wide', 'pb-1');
                    mainOptionsContainer.appendChild(groupHeader);
                    
                    // 2. Container for the options within the group (Este es el que usaremos como padre de retorno)
                    const groupDiv = document.createElement('div');
                    groupDiv.id = group.optionsId; // ID para retorno
                    groupDiv.classList.add('option-group-container', 'flex', 'flex-wrap', 'gap-3', 'mb-4', 'p-1', 'justify-center', 'border-none');
                    
                    // Clonar para la mezcla y para la referencia de índice
                    const originalOptions = [...group.options];
                    const referenceArray = [...group.options]; // Array para buscar índices
                    const shuffledOptions = shuffleArray([...group.options]);
                    
                    shuffledOptions.forEach(optionText => {
                        const item = document.createElement('div');
                        item.textContent = optionText;
                        item.classList.add(
                            'option-item', 
                            'px-3', 'py-1', 'bg-gray-600', 'rounded-full', 
                            'text-base', 'text-gray-100', 'shadow-sm', 'hover:bg-gray-500', 
                            'flex-shrink-0'
                        );
                        
                        // --- CLAVE PARA EL ORDEN: Almacenar índice y contenedor de origen ---
                        // Encontrar el índice de la PRIMERA ocurrencia en el array de referencia
                        const originalIndex = referenceArray.findIndex(refText => refText === optionText);
                        
                        item.dataset.originalIndex = originalIndex; 
                        item.dataset.originalContainerId = group.optionsId;
                        
                        item.addEventListener('click', (e) => handleOptionClick(e, item));
                        groupDiv.appendChild(item);
                        
                        // Marcar como "usada" la opción para que la siguiente opción idéntica obtenga el siguiente índice.
                        if (originalIndex > -1) {
                            referenceArray.splice(originalIndex, 1, null); 
                        }
                    });
                    mainOptionsContainer.appendChild(groupDiv);
                });
            }


         
            function initializeEimeria() {
                const targetsContainer = document.getElementById('eimeria-targets');
                targetsContainer.innerHTML = '';
                
                generateOptions('eimeria-options', EIMERIA_SEQUENCE);

                EIMERIA_SEQUENCE.forEach((_, index) => {
                    const targetWrapper = document.createElement('div');
                    targetWrapper.classList.add('flex', 'items-start', 'space-x-3', 'mb-4'); 

                    const stepNumber = document.createElement('span');
                    stepNumber.textContent = `${index + 1}.`;
                    stepNumber.classList.add('text-xl', 'font-bold', 'text-teal-400', 'flex-shrink-0', 'mt-2');
                    
                    const targetSlot = document.createElement('div');
                    targetSlot.classList.add('click-target', 'w-full', 'rounded-lg', 'text-base', 'text-gray-400', 'justify-center'); 
                    targetSlot.textContent = EIMERIA_PLACEHOLDERS[index];
                    
                    targetSlot.addEventListener('click', () => handleTargetClick(targetSlot, 'eimeria-options'));
                    
                    targetWrapper.appendChild(stepNumber);
                    targetWrapper.appendChild(targetSlot);
                    targetsContainer.appendChild(targetWrapper);
                });
                
                document.getElementById('feedback-eimeria').classList.add('hidden');
            }


           
            function initializeCoccidiaTable() {
                const tableBody = document.getElementById('coccidia-table-body');
                tableBody.innerHTML = '';
                
                generateGroupedOptions('coccidia-options'); 

                Object.keys(COCCIDIA_DATA).forEach(coccidio => {
                    const row = tableBody.insertRow();
                    row.classList.add('hover:bg-gray-700');

                    // Coccidio Name (Static)
                    let cellName = row.insertCell();
                    cellName.classList.add('px-3', 'py-2', 'font-bold', 'bg-gray-700', 'text-teal-400', 'text-base');
                    cellName.textContent = coccidio;

                    // Drop Targets (HD, Loc, Ciclo, Tisular)
                    for (let i = 0; i < 4; i++) {
                        let cell = row.insertCell();
                        cell.classList.add('px-3', 'py-2', 'text-gray-300'); 

                        const clickTarget = document.createElement('div');
                        clickTarget.classList.add('click-target', 'w-full', 'mx-auto', 'rounded-lg', 'text-sm', 'justify-center'); 
                        clickTarget.textContent = `Colocar: ${COCCIDIA_PLACEHOLDERS[i]}`;
                        
                        clickTarget.addEventListener('click', () => handleTargetClick(clickTarget, 'coccidia-options'));
                        
                        cell.appendChild(clickTarget);
                    }
                });
                
                document.getElementById('feedback-coccidia').classList.add('hidden');
            }
            
            function initializeAll() {
                if (selectedOption) {
                    selectedOption.classList.remove('selected');
                    selectedOption = null;
                }
                initializeEimeria();
                initializeCoccidiaTable();
                
                // Configuración de Listeners para devolver al Pool al hacer clic en el fondo del pool
                document.getElementById('eimeria-options').addEventListener('click', (e) => handlePoolDrop(e, 'eimeria-options'));
                document.getElementById('coccidia-options').addEventListener('click', (e) => handlePoolDrop(e, 'coccidia-options'));
            }


            // --- INICIALIZACIÓN DE EVENTOS GLOBALES ---

            window.onload = function() {
                initializeAll();
            };

            // Exponer funciones para uso en el HTML
            window.checkEimeriaSequence = checkEimeriaSequence;
            window.checkCoccidiaTable = checkCoccidiaTable;
            window.initializeAll = initializeAll;
    