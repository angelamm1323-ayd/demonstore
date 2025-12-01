<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let product;
    export let index = 0;

    function openModal() {
        dispatch("open", { product });
    }

    const formatCurrency = (n) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(n);

    const imgSrc = (p) => (p?.image?.trim() ? p.image : "/imagenotfound.jpg");
</script>

<article
    class="group relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2"
    in:fly={{
        y: 50,
        duration: 500,
        delay: index * 50,
        easing: quintOut,
    }}
>
    <div class="relative overflow-hidden">
        <img
            src={imgSrc(product)}
            alt={product.name}
            class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            on:error={(e) => (e.target.src = "/imagenotfound.jpg")}
        />
        <div
            class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>

        {#if product.stock <= 5}
            <div
                class="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold"
            >
                ¡Últimas unidades!
            </div>
        {/if}
    </div>

    <div class="p-6">
        <h3
            class="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors"
        >
            {product.name}
        </h3>

        {#if product.description}
            <p class="text-sm text-gray-400 mb-4 line-clamp-2">
                {product.description}
            </p>
        {/if}

        <div class="flex items-center justify-between mb-4">
            <div>
                <p class="text-xs text-gray-500">Precio</p>
                <p class="text-2xl font-bold text-red-400">
                    {formatCurrency(product.valorVenta)}
                </p>
            </div>
            <div class="text-right">
                <p class="text-xs text-gray-500">Stock</p>
                <p class="text-lg font-semibold text-white">
                    {product.stock}
                </p>
            </div>
        </div>
        <!-- En ProductCard.svelte -->
        <button
            on:click={openModal}
            class="block w-full bg-linear-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.03] active:scale-95 text-center cursor-pointer"
        >
            Ver más
        </button>
    </div>
</article>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* Asegurar que el modal esté por encima de todo */
    :global(body.modal-open) {
        overflow: hidden;
    }

    :global(.modal-overlay) {
        z-index: 1000;
    }
</style>
