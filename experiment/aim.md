Optimization is the process of selecting the best from a set of alternatives. Optimization is performed for function that is multi-variable, continuous and differentiable, and typical optimization techniques find minima or maxima of the function.

In nature, molecules are most likely to be found in those conformations which are most stable (energy minimum). The potential energy surface (PES) of the molecular configuration is first computed using quantum mechanics. Each local minima on the on this PES represents a stable conformation, and a "movie" of the molecule will show that most of the time the molecule spends near these locally stable conformations with sudden jumps to nearby stable conformations, with the rate that depends on the energy barrier of such a jump. If one of the stable conformations is significantly more stable then the molecule will be trapped in that conformation and geometry. Or if the stable conformations are separated by large barriers, the molecule will be trapped in whatever stable conformation that is achieved first.

PES is a hyper-surface showing the energy of a particular conformation . This many dimensional hyper-surface can be characterized by points where the gradient is zero, which can be classified into following categories:

1. Local Maxima: a point on the hyper-surface that has the highest function value in its near neighborhood;
   all nearby points have lower values. A hyper-surface will have very many local maxima, in general.
2. Local Minima: a point on the hyper-surface that has the lowest function value in its near neighborhood;
   all nearby points have higher values. A hyper-surface will have very many local minima, in general.
 3. Global Maxima: From the set of points which are local maxima, it is that point that has the highest function value.
    A hyper-surface can have only one global maxima.
4. Global Minima: From the set of points which are local minima, it is that point that has the lowest function value.
    A hyper-surface can have only one global minima.
5. Saddle point: A point on the hyper-surface which has minimum in at least one direction and maximum other directions;
        the conformation at the saddle point represents the transition structure between two stable conformations.

To identify the stable conformations, local minima of the PES need to be computed. This is called Geometry Optimization and is used to:

1. Characterize a potential energy surface
2. Obtain a structure for a single-point quantum mechanical calculation, which provides a large set of structural and electronic properties for the stable conformation.
3. Prepare a structure for molecular dynamics simulation (if the forces on atoms are too large, the integration algorithm
        may fail; so starting the simulation at stable conformation is crucial).

