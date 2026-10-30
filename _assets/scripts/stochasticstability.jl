using Random, Statistics, Plots

function simulate_maps(a, sigma, steps)
    x_det = zeros(steps)
    x_stoch = zeros(steps)
    
    # Start both far from the origin
    x_det[1] = 10.0 
    x_stoch[1] = 10.0
    
    for n in 1:(steps-1)
        # Deterministic: strict fixed point
        x_det[n+1] = a * x_det[n]
        
        # Stochastic: kicked by random noise
        x_stoch[n+1] = a * x_stoch[n] + sigma * randn()
    end
    
    return x_det, x_stoch
end

# Set parameters for a stable system
a = 0.99
sigma = 0.5
steps = 1000

x_det, x_stoch = simulate_maps(a, sigma, steps)

# Visualizing the time series
p=plot(x_det[1:500], label="Deterministic", linewidth=2, xlabel="Time step (n)", ylabel="x")
plot!(p,x_stoch[1:500], label="Stochastic", alpha=0.6)

p1=histogram(x_stoch[100:end], normalize=:pdf, bins=30, 
          label="Stochastic Distribution", 
          xlabel="State (x)", ylabel="Probability Density", 
          alpha=0.6, color=:blue, legend=:topright)
p=plot(p, p1, layout=(1,2), size=(1200,600), title="Stochastic Stability in a Stable System")
##

using Random, Plots

function simulate_2d_stochastic(lambda_x, lambda_y, sigma, steps)
    x = zeros(steps)
    y = zeros(steps)
    
    # Start at the origin
    x[1] = 0.0
    y[1] = 0.0
    
    for n in 1:(steps-1)
        # Fast mode
        x[n+1] = lambda_x * x[n] + sigma * randn()
        # Slow mode
        y[n+1] = lambda_y * y[n] + sigma * randn()
    end
    
    return x, y
end

# Parameters
lambda_1 = 0.1   # Fast mode (tightly bound)
lambda_2 = 0.95  # Slow mode (loose, high variance)
sigma = 1.0
steps = 10000    # More steps give a better picture of the distribution

x_vals, y_vals = simulate_2d_stochastic(lambda_1, lambda_2, sigma, steps)

# Visualizing the cloud
scatter(x_vals, y_vals, 
        title="2D Stationary Distribution", 
        xlabel="x (Fast Mode, λ=0.1)", 
        ylabel="y (Slow Mode, λ=0.95)", 
        legend=false, 
        markersize=1.5, 
        markerstrokewidth=0, 
        alpha=0.4, 
        aspect_ratio=:equal) # Equal aspect ratio shows the true stretching


##

using Random, Statistics, Plots

function simulate_logistic(r, sigma, steps)
    x_det = zeros(steps)
    x_stoch = zeros(steps)
    
    x_det[1] = 0.5
    x_stoch[1] = 0.5
    
    for n in 1:(steps-1)
        # Deterministic map
        x_det[n+1] = r * x_det[n] * (1 - x_det[n])
        
        # Stochastic map (clamped to keep the state within the [0,1] domain)
        noise = sigma * randn()
        x_stoch[n+1] = clamp(r * x_stoch[n] * (1 - x_stoch[n]) + noise, 0.001, 0.999)
    end
    
    return x_det, x_stoch
end

# Set parameters
r = 2.8       # Stable regime for the deterministic map
sigma = 0.05  # Noise intensity
steps = 50000

x_det, x_stoch = simulate_logistic(r, sigma, steps)

# --- 1. Deterministic Fixed Point and Stability ---
x_star = 1 - 1/r  # Analytical fixed point
lyap_det = log(abs(r * (1 - 2 * x_star)))

# --- 2. Stochastic Stability ---
# We approximate the integral over P(x) using the time-average of the trajectory
lyap_stoch = mean(log.(abs.(r .* (1 .- 2 .* x_stoch[1000:end]))))

println("Deterministic Fixed Point: x* = ", round(x_star, digits=4))
println("Deterministic Lyapunov Exponent: ", round(lyap_det, digits=4))
println("Stochastic Lyapunov Exponent: ", round(lyap_stoch, digits=4))

# --- 3. Visualizing P(x) ---
histogram(x_stoch, normalize=:pdf, bins=100, 
          label="Stationary Distribution P(x)", 
          xlabel="State (x)", ylabel="Probability Density", 
          alpha=0.6, color=:blue, legend=:topleft)
vline!([x_star], label="Deterministic Fixed Point x*", color=:red, linewidth=3)

##

using Random, Plots

function euler_maruyama(r, sigma, dt, steps)
    x = zeros(steps)
    x[1] = 0.0 # Start at the origin
    
    for i in 1:(steps-1)
        # Deterministic drift: f(x)
        drift = r * x[i] - x[i]^3
        
        # Stochastic diffusion
        diffusion = sigma * randn() * sqrt(dt)
        
        # Euler-Maruyama step
        x[i+1] = x[i] + drift * dt + diffusion
    end
    
    return x
end

# Parameters
r_values = [-1.0, 0.0, 1.0, 2.0]
sigma = 0.7
dt = 0.05
steps = 200000 # Large number of steps to get smooth histograms

# Create a 2x2 grid of plots
plt = plot(layout=(2,2), size=(800, 600), legend=false, 
           plot_title="Stochastic Pitchfork Bifurcation")

for (i, r) in enumerate(r_values)
    # Run the simulation
    x_sim = euler_maruyama(r, sigma, dt, steps)
    
    # Drop the first 10% of steps to allow the system to settle into P(x)
    burn_in = Int(0.1 * steps)
    x_steady = x_sim[burn_in:end]
    
    # Plot the histogram (probability density)
    histogram!(plt[i], x_steady, normalize=:pdf, bins=150, 
               title="r = $r", xlabel="x", ylabel="P(x)", 
               color=:purple, alpha=0.6, xlims=(-2.5, 2.5))
end

display(plt)

##

using Random, Plots

function simulate_climate(r, A, omega, sigma, dt, steps)
    x = zeros(steps)
    x[1] = -sqrt(r) # Start in the cold glacial state (left well)
    
    for i in 1:(steps-1)
        t = i * dt
        # Deterministic drift + weak orbital wave
        drift = r * x[i] - x[i]^3 + A * sin(omega * t)
        
        # Stochastic diffusion (weather noise)
        diffusion = sigma * randn() * sqrt(dt)
        
        # Euler-Maruyama step
        x[i+1] = x[i] + drift * dt + diffusion
    end
    
    return x
end

# Parameters
r = 1.5         # Double-well shape
A = 0.25        # Weak orbital wobble
omega = 0.01    # Slow orbital frequency
sigma = 0.45    # Short-term weather noise
dt = 0.1
steps = 50000

x_climate = simulate_climate(r, A, omega, sigma, dt, steps)
time_array = (1:steps) .* dt

# Plot the climate history over time
plot(time_array, x_climate, label="Global Temperature", 
     xlabel="Time", ylabel="Climate State (x)", 
     title="Stochastic Resonance in Earth's Climate", 
     color=:teal, linewidth=1.5, alpha=0.8, legend=:bottomright)
hline!([sqrt(r), -sqrt(r)], color=:red, linestyle=:dash, 
       label="Stable States (Warm / Ice Age)")