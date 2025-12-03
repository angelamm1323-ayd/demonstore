<script>
	import "../app.css";
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import { page } from "$app/stores";

	let { children } = $props();

	// Detectar si estamos en rutas de admin
	const isAdminRoute = $derived($page.url.pathname.startsWith("/admin"));

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// Cerrar menú móvil cuando se hace clic en un enlace
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href="/logo-cropped-2.svg" />
</svelte:head>

{#if !isAdminRoute}
	<!-- Navbar público -->
	<header
		class="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-950 text-gray-50"
	>
		<nav class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-center">
				<!-- Desktop Menu -->
				<div class="hidden md:flex items-center gap-6">
					<a
						href="/"
						class="hover:text-red-400 transition-colors {$page.url
							.pathname === '/'
							? 'text-red-400 font-semibold'
							: ''}"
					>
						<i class="fas fa-home"></i>
						Inicio
					</a>
					<a
						href="/catalogo"
						class="hover:text-red-400 transition-colors {$page.url
							.pathname === '/catalogo'
							? 'text-red-400 font-semibold'
							: ''}"
					>
						<i class="fas fa-shopping-bag"></i>
						Catálogo
					</a>
					<a
						href="/nosotros"
						class="hover:text-red-400 transition-colors {$page.url
							.pathname === '/nosotros'
							? 'text-red-400 font-semibold'
							: ''}"
					>
						<i class="fas fa-info-circle"></i>
						Nosotros
					</a>
					<a
						href="/contacto"
						class="hover:text-red-400 transition-colors {$page.url
							.pathname === '/contacto'
							? 'text-red-400 font-semibold'
							: ''}"
					>
						<i class="fas fa-envelope"></i>
						Contacto
					</a>
				</div>
				<div
					class="md:hidden flex items-center justify-between gap-4 w-full"
				>
					<div class="flex items-center justify-center gap-2">
						<img
							src="/logo.jpg"
							class="rounded-full border-red-500 border-2 h-16"
							alt="logo-imagen"
						/>
						<h1 class="text-2xl font-white">DEMON STORE</h1>
					</div>
					<!-- Mobile Menu Button -->
					<button
						class="text-white text-2xl"
						onclick={toggleMobileMenu}
						aria-label="Toggle menu"
					>
						<i class="fas fa-{mobileMenuOpen ? 'times' : 'bars'}"
						></i>
					</button>
				</div>
			</div>

			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
					<div>
						<a
							href="/"
							class="block py-2 hover:text-red-400 transition-colors {$page
								.url.pathname === '/'
								? 'text-red-400 font-semibold'
								: ''}"
							onclick={closeMobileMenu}
						>
							<i class="fas fa-home"></i> Inicio
						</a>
						<a
							href="/catalogo"
							class="block py-2 hover:text-red-400 transition-colors {$page
								.url.pathname === '/catalogo'
								? 'text-red-400 font-semibold'
								: ''}"
							onclick={closeMobileMenu}
						>
							<i class="fas fa-shopping-bag"></i> Catálogo
						</a>
						<a
							href="/nosotros"
							class="block py-2 hover:text-red-400 transition-colors {$page
								.url.pathname === '/nosotros'
								? 'text-red-400 font-semibold'
								: ''}"
							onclick={closeMobileMenu}
						>
							<i class="fas fa-info-circle"></i> Nosotros
						</a>
						<a
							href="/contacto"
							class="block py-2 hover:text-red-400 transition-colors {$page
								.url.pathname === '/contacto'
								? 'text-red-400 font-semibold'
								: ''}"
							onclick={closeMobileMenu}
						>
							<i class="fas fa-envelope"></i> Contacto
						</a>
					</div>
				</div>
			{/if}
		</nav>
	</header>

	<!-- Floating WhatsApp Button (solo en páginas públicas) -->
	<a
		href="https://wa.me/573189746650"
		class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 z-50"
		aria-label="Chat en WhatsApp"
	>
		<i class="fab fa-whatsapp text-2xl"></i>
	</a>
{/if}

{@render children()}

{#if !isAdminRoute}
	<!-- Footer público -->
	<footer class="bg-linear-to-b from-gray-900 to-black py-12">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center">
				<div
					class="w-20 h-20 mb-6 rounded-full bg-linear-to-br from-red-600 to-red-900 p-1"
				>
					<img
						src="/logo.jpg"
						alt="Demon Store Logo"
						class="w-full h-full object-cover rounded-full border-2 border-gray-800"
					/>
				</div>

				<p
					class="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-red-400 mb-4"
				>
					DEMON STORE
				</p>

				<p class="text-gray-500 text-center max-w-md mb-8">
					"Además de venderte ropa, te vendemos estilo"
				</p>

				<div class="flex space-x-6 mb-8">
					<a
						href="https://wa.me/573189746650"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-500 hover:text-white text-xl transition-colors"
						aria-label="WhatsApp"
					>
						<i class="fab fa-whatsapp"></i>
					</a>
					<a
						href="https://instagram.com/demon__store"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-500 hover:text-white text-xl transition-colors"
						aria-label="Instagram"
					>
						<i class="fab fa-instagram"></i>
					</a>
					<a
						href="https://tiktok.com/@demon__store"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-500 hover:text-white text-xl transition-colors"
						aria-label="TikTok"
					>
						<i class="fab fa-tiktok"></i>
					</a>
					<a
						href="https://www.facebook.com/profile.php?id=61576041629617"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-500 hover:text-white text-xl transition-colors"
						aria-label="Facebook"
					>
						<i class="fab fa-facebook"></i>
					</a>
				</div>

				<div class="border-t border-gray-800 w-full max-w-2xl pt-8">
					<p class="text-sm text-gray-600 text-center">
						&copy; {new Date().getFullYear()} Demon Store.
					</p>
					<p class="text-xs text-gray-700 text-center mt-2">
						Diseñado con ❤️ para amantes de la moda
					</p>
				</div>
			</div>
		</div>
	</footer>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out;
	}
</style>
