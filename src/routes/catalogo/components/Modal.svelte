<!-- En Modal.svelte -->
<script>
    import { fade } from "svelte/transition";

    export let isOpen = false;
    export let product = null;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    const close = () => {
        dispatch("close");
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(price);
    };
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 p-4 overflow-y-auto"
        on:click|self={close}
        on:keydown={(e) => e.key === "Escape" && close()}
        transition:fade
        role="dialog"
        aria-modal="true"
        aria-label="Detalle del producto"
        tabindex="0"
    >
        <div
            class="mx-auto bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl max-w-4xl w-full animate-fade-up relative rounded-lg overflow-hidden"
            role="document"
        >
            <div class="grid grid-cols-1 md:grid-cols-2">
                <!-- IZQUIERDA - IMAGEN -->
                <div
                    class="relative h-72 md:h-full w-full overflow-hidden bg-gray-900"
                >
                    <img
                        src={product?.image || "/imagenotfound.jpg"}
                        alt={product?.name}
                        class="w-full h-full object-cover"
                        on:error={(e) => (e.target.src = "/imagenotfound.jpg")}
                    />

                    <button
                        on:click={close}
                        aria-label="Cerrar"
                        class="absolute top-4 right-4 bg-gray-700/80 text-white w-10 h-10 rounded-full
                               flex items-center justify-center text-xl shadow hover:bg-red-600 transition cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <!-- DERECHA - CONTENIDO -->
                <div class="flex flex-col h-full p-6">
                    <div
                        class="flex flex-col gap-6 overflow-auto grow pr-2 justify-evenly items-start"
                    >
                        <div class="flex flex-col space-y-2">
                            <h1 class="text-2xl font-bold text-white">
                                {product?.name}
                            </h1>

                            {#if product?.description}
                                <p
                                    class="text-gray-300 text-md leading-relaxed"
                                >
                                    {product.description}
                                </p>
                            {/if}
                        </div>

                        <!-- TALLAS Y ESPECIFICACIONES -->
                        {#if product?.sizes && Object.values(product.sizes).some((v) => v > 0)}
                            <div class="w-full">
                                <p class="text-sm text-gray-400 mb-2">
                                    Tallas disponibles
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    {#each Object.entries(product.sizes) as [talla, cantidad]}
                                        {#if cantidad > 0}
                                            <div
                                                class="flex flex-col items-center"
                                            >
                                                <span
                                                    class="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                                                >
                                                    {talla.toUpperCase()}
                                                </span>
                                                <span
                                                    class="text-xs text-gray-400 mt-1"
                                                    >{cantidad} unid.</span
                                                >
                                            </div>
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <!-- Información de precios y stock -->
                        <div class="w-full space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm text-gray-400">
                                        Precio de venta
                                    </p>
                                    <p class="text-xl font-bold text-gray-300">
                                        {formatPrice(product?.valorVenta)}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">
                                        Tipo de prenda
                                    </p>
                                    <p class="text-lg text-white capitalize">
                                        {product?.clothingType === "top"
                                            ? "Superior"
                                            : "Inferior"}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">
                                        Categoría
                                    </p>
                                    <p class="text-lg text-white capitalize">
                                        {product.category || "Sin categoría"}
                                    </p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-gray-400">
                                        Stock total
                                    </p>
                                    <p class="text-2xl font-bold text-white">
                                        {product?.stock} unid.
                                    </p>
                                </div>
                            </div>

                            <!-- Tallas numéricas para pantalones -->
                            {#if product?.clothingType === "bottom" && product?.numericSizes?.length > 0}
                                <div class="mt-4">
                                    <p class="text-sm text-gray-400 mb-2">
                                        Tallas disponibles
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each product.numericSizes as size}
                                            <span
                                                class="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                                            >
                                                #{size.size} - {size.quantity} unidades
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>

                    <!-- BOTONES DE ACCIÓN -->
                    <div class="mt-6 pt-6 border-t border-gray-700">
                        <a
                            href={`https://wa.me/573189746650?text=Hola! Me interesa el producto: ${encodeURIComponent(product?.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-full bg-linear-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900
                                   text-white py-3 px-4 rounded-lg font-medium transition-all duration-300
                                   transform hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2"
                        >
                            <i class="fab fa-whatsapp text-xl"></i>
                            Consultar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .animate-fade-up {
        animation: fadeUp 0.25s ease-out;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
