<script>
    import ProductCard from "./ProductCard.svelte";
    import Modal from "./Modal.svelte";

    export let filteredProducts = [];
    export let loading = false;

    let isModalOpen = false;
    let selectedProduct = null;

    function openModal(event) {
        selectedProduct = event.detail.product;
        isModalOpen = true;
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        isModalOpen = false;
        selectedProduct = null;
        document.body.style.overflow = "auto";
    }
</script>

<section class="container mx-auto px-4 py-12 pb-20">
    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
            ></div>
        </div>
    {:else if filteredProducts.length === 0}
        <div class="text-center py-20">
            <i class="fas fa-box-open text-6xl text-gray-600 mb-4"></i>
            <h3 class="text-2xl font-bold mb-2">
                No hay productos disponibles
            </h3>
            <p class="text-gray-400">Intenta con otra búsqueda o categoría</p>
        </div>
    {:else}
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {#each filteredProducts as product, i (product.docId)}
                <ProductCard {product} index={i} on:open={openModal} />
            {/each}
        </div>
    {/if}
    <Modal
        isOpen={isModalOpen}
        product={selectedProduct}
        on:close={closeModal}
    />
</section>
