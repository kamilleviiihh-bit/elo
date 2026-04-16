// Dados da Aplicação
const categories = [
    { name: 'Alimentação', emoji: '🍽️', count: 42 },
    { name: 'Beleza', emoji: '💅', count: 28 },
    { name: 'Tecnologia', emoji: '💻', count: 19 },
    { name: 'Moda', emoji: '👗', count: 31 },
    { name: 'Serviços', emoji: '🔧', count: 22 },
    { name: 'Artesanato', emoji: '🎨', count: 15 }
];

const businesses = [
    { name: 'Doces da Vovó', cat: 'Alimentação', emoji: '🍰', desc: 'Bolos e doces artesanais feitos com amor e receitas tradicionais.', rating: 5, tags: ['Encomenda', 'Delivery'] },
    { name: 'Studio Hair Art', cat: 'Beleza', emoji: '💇‍♀️', desc: 'Cortes modernos, coloração e tratamentos capilares.', rating: 5, tags: ['Agendamento'] },
    { name: 'TechFix Soluções', cat: 'Tecnologia', emoji: '🖥️', desc: 'Conserto de celulares e notebooks em geral.', rating: 4, tags: ['Garantia'] },
    { name: 'Ateliê Flora', cat: 'Moda', emoji: '👗', desc: 'Roupas sob medida e ajustes impecáveis.', rating: 5, tags: ['Sob Medida'] },
    { name: 'Sabor Caseiro', cat: 'Alimentação', emoji: '🥘', desc: 'Marmitas fitness com ingredientes frescos.', rating: 4, tags: ['Fitness'] },
    { name: 'Mãos de Arte', cat: 'Artesanato', emoji: '🏺', desc: 'Peças decorativas únicas em cerâmica.', rating: 5, tags: ['Presentes'] }
];

let activeFilter = 'Todos';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderCategories();
    renderFilters();
    renderBiz();
    setupMobileMenu();
    setupContactForm();
});

// Menu Mobile
function setupMobileMenu() {
    const btn = document.getElementById('mobile-btn');
    const menu = document.getElementById('mobile-menu');
    btn.onclick = () => menu.classList.toggle('hidden');
}

// Renderizar Categorias
function renderCategories() {
    const catGrid = document.getElementById('cat-grid');
    categories.forEach((c, i) => {
        const div = document.createElement('div');
        div.className = `card-biz p-5 rounded-2xl text-center cursor-pointer anim-fade bg-white border-2 border-[#E8EDF5]`;
        div.style.animationDelay = `${i * 0.1}s`;
        div.innerHTML = `
            <div class="text-3xl mb-2">${c.emoji}</div>
            <div class="font-heading font-700 text-sm text-[#0F1F40]">${c.name}</div>
            <div class="text-xs mt-1 text-[#8FA3CC]">${c.count} negócios</div>
        `;
        div.onclick = () => { activeFilter = c.name; renderFilters(); renderBiz(); };
        catGrid.appendChild(div);
    });
}

// Botões de Filtro
function renderFilters() {
    const container = document.getElementById('filter-btns');
    container.innerHTML = '';
    ['Todos', ...categories.map(c => c.name)].forEach(f => {
        const btn = document.createElement('button');
        btn.className = `px-4 py-2 rounded-full text-xs font-600 transition-all ${f === activeFilter ? 'bg-[#FF9F1C] text-[#0F1F40]' : 'bg-white text-[#5A76B3] border border-[#C5D0E6]'}`;
        btn.textContent = f;
        btn.onclick = () => { activeFilter = f; renderFilters(); renderBiz(); };
        container.appendChild(btn);
    });
}

// Renderizar Vitrine
function renderBiz() {
    const grid = document.getElementById('biz-grid');
    grid.innerHTML = '';
    const filtered = activeFilter === 'Todos' ? businesses : businesses.filter(b => b.cat === activeFilter);
    
    filtered.forEach((b, i) => {
        const card = document.createElement('div');
        card.className = `card-biz rounded-2xl overflow-hidden bg-white border-2 border-[#E8EDF5]`;
        const stars = '★'.repeat(b.rating) + '☆'.repeat(5 - b.rating);
        card.innerHTML = `
            <div class="h-32 flex items-center justify-center text-5xl bg-[#E8EDF5]">${b.emoji}</div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-heading font-700 text-sm text-[#0F1F40]">${b.name}</h3>
                    <span class="text-xs text-[#FF9F1C]">${stars}</span>
                </div>
                <span class="inline-block px-2 py-0.5 rounded-full text-xs font-500 mb-3 bg-[#FFE8B3] text-[#CC6200]">${b.cat}</span>
                <p class="text-xs leading-relaxed mb-4 text-[#5A76B3]">${b.desc}</p>
                <button class="w-full py-2.5 rounded-xl text-xs font-600 bg-[#2E4A8A] text-white hover:bg-[#1A3366] transition-colors">Ver Detalhes</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Formulário
function setupContactForm() {
    const form = document.getElementById('contact-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const msg = document.getElementById('form-msg');
        msg.classList.remove('hidden');
        msg.style.backgroundColor = '#E8F5E9';
        msg.style.color = '#2E7D32';
        msg.textContent = '✅ Cadastro enviado com sucesso!';
        form.reset();
        setTimeout(() => msg.classList.add('hidden'), 4000);
    };
}