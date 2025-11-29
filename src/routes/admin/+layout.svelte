<script>
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import { onMount } from "svelte";
    import { onAuthChange, signOut } from "$lib/js/firebase";
    import { goto } from "$app/navigation";
    import { onDestroy } from "svelte";
    import { page } from "$app/stores";

    let mobileMenuOpen = false;
    let isUserMenuOpen = false;
    let isAuthenticated = false;
    let isLoading = true;
    let userEmail = "";

    // Check authentication state
    const unsubscribe = onAuthChange((user) => {
        isAuthenticated = !!user;
        if (user) {
            userEmail = user.email || "";
        }
        isLoading = false;

        if (!user) {
            // Redirect to login if not authenticated
            goto("/login");
        }
    });

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut();
            goto("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    // Cleanup subscription
    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

{#if isLoading}
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
        <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
        ></div>
    </div>
{:else if isAuthenticated}
    <!-- Header -->
    <header
        class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 text-gray-50"
    >
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo / Back to store -->
                <a
                    href="/"
                    class="flex items-center gap-2 text-gray-50 hover:text-red-400 transition-colors"
                >
                    <i class="fas fa-arrow-left"></i>
                    <span class="font-medium">Volver a la tienda</span>
                </a>

                <!-- Mobile menu button -->
                <button
                    class="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    on:click={toggleMobileMenu}
                    aria-label="Menú"
                >
                    <i class="fas fa-bars text-xl"></i>
                </button>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-1">
                    <a
                        href="/admin"
                        class="px-4 py-2 hover:text-red-400 transition-colors {$page
                            .url.pathname === '/admin'
                            ? 'text-red-400 font-semibold'
                            : ''}"
                    >
                        <i class="fas fa-home mr-2"></i>Panel
                    </a>
                    <a
                        href="/admin/categorias"
                        class="px-4 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                            '/admin/categorias',
                        )
                            ? 'text-red-400 font-semibold'
                            : ''}"
                    >
                        <i class="fas fa-tags mr-2"></i>Categorías
                    </a>
                    <a
                        href="/admin/proveedores"
                        class="px-4 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                            '/admin/proveedores',
                        )
                            ? 'text-red-400 font-semibold'
                            : ''}"
                    >
                        <i class="fas fa-truck mr-2"></i>Proveedores
                    </a>
                    <a
                        href="/admin/prendas"
                        class="px-4 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                            '/admin/prendas',
                        )
                            ? 'text-red-400 font-semibold'
                            : ''}"
                    >
                        <i class="fas fa-tshirt mr-2"></i>Prendas
                    </a>
                    <a
                        href="/admin/cuentas"
                        class="px-4 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                            '/admin/cuentas',
                        )
                            ? 'text-red-400 font-semibold'
                            : ''}"
                    >
                        <i class="fas fa-coins mr-2"></i>Cuentas
                    </a>

                    <!-- User Dropdown -->
                    <div class="relative ml-2">
                        <button
                            type="button"
                            class="flex items-center gap-2 hover:text-red-400 transition-colors"
                            on:click={() => (isUserMenuOpen = !isUserMenuOpen)}
                        >
                            <span class="hidden md:inline">{userEmail}</span>
                            <i class="fas fa-chevron-down text-xs"></i>
                        </button>

                        {#if isUserMenuOpen}
                            <div
                                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                role="menu"
                                tabindex="-1"
                            >
                                <div class="py-1" role="none">
                                    <button
                                        on:click={handleLogout}
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        <i class="fas fa-sign-out-alt mr-2"
                                        ></i>Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        {/if}
                    </div>
                </nav>
            </div>

            <!-- Mobile Navigation -->
            {#if mobileMenuOpen}
                <div class="md:hidden mt-3 pt-3 border-t border-gray-800">
                    <div class="flex flex-col space-y-2">
                        <a
                            href="/admin"
                            class="px-3 py-2 hover:text-red-400 transition-colors {$page
                                .url.pathname === '/admin'
                                ? 'text-red-400 font-semibold'
                                : ''}"
                            on:click={toggleMobileMenu}
                        >
                            <i class="fas fa-home mr-2"></i>Panel
                        </a>
                        <a
                            href="/admin/categorias"
                            class="px-3 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                                '/admin/categorias',
                            )
                                ? 'text-red-400 font-semibold'
                                : ''}"
                            on:click={toggleMobileMenu}
                        >
                            <i class="fas fa-tags mr-2"></i>Categorías
                        </a>
                        <a
                            href="/admin/proveedores"
                            class="px-3 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                                '/admin/proveedores',
                            )
                                ? 'text-red-400 font-semibold'
                                : ''}"
                            on:click={toggleMobileMenu}
                        >
                            <i class="fas fa-truck mr-2"></i>Proveedores
                        </a>
                        <a
                            href="/admin/prendas"
                            class="px-3 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                                '/admin/prendas',
                            )
                                ? 'text-red-400 font-semibold'
                                : ''}"
                            on:click={toggleMobileMenu}
                        >
                            <i class="fas fa-tshirt mr-2"></i>Prendas
                        </a>
                        <a
                            href="/admin/cuentas"
                            class="px-3 py-2 hover:text-red-400 transition-colors {$page.url.pathname.startsWith(
                                '/admin/cuentas',
                            )
                                ? 'text-red-400 font-semibold'
                                : ''}"
                            on:click={toggleMobileMenu}
                        >
                            <i class="fas fa-coins mr-2"></i>Cuentas
                        </a>
                        <button
                            on:click={() => {
                                toggleMobileMenu();
                                handleLogout();
                            }}
                            class="w-full text-left px-3 py-2 hover:text-red-400 transition-colors"
                        >
                            <i class="fas fa-sign-out-alt mr-2"></i>Cerrar
                            sesión
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </header>

    <main>
        <slot />
    </main>
{/if}

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #1a1a1a;
    }

    ::-webkit-scrollbar-thumb {
        background: #4b5563;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #6b7280;
    }
</style>
