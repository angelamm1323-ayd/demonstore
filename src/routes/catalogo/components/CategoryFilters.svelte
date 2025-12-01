<script>
    export let categories = [];
    export let products = [];
    export let selectedCategory = "all";
</script>

<section class="container mx-auto px-4 py-8">
    <div class="flex flex-wrap gap-3 justify-center">
        <button
            class="px-6 py-2 rounded-full border-2 transition-all {selectedCategory ===
            'all'
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-gray-700 text-gray-300 hover:border-red-600'}"
            on:click={() => (selectedCategory = "all")}
        >
            Todos ({products.length})
        </button>
        {#each categories as category}
            <button
                class="px-6 py-2 rounded-full border-2 transition-all {selectedCategory ===
                category.docId
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'border-gray-700 text-gray-300 hover:border-red-600'}"
                on:click={() => (selectedCategory = category.docId)}
            >
                {category.nombre}
                ({products.filter((p) => p.categoryId === category.docId)
                    .length})
            </button>
        {/each}
    </div>
</section>
